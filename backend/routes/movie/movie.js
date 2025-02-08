const express = require("express");
const { movie } = require("../../db");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

router.get("/all", async function (req, res) {
  try {
    const movies = await movie.find({}).limit(50);
    res.json(movies);
  } catch (error) {
    console.log("Error in fetching all movies in /all endpoint: ", error);
  }
});

async function autoCompleteAndFuzzySearch(search) {
  try {
    const result = await movie.aggregate([
      {
        $search: {
          autocomplete: {
            query: search,
            path: "title",
            fuzzy: { prefixLength: 1, maxExpansions: 50 },
          },
        },
      },
      { $limit: 20 },
      { $project: { _id: 1, title: 1 } },
    ]);
    return result;
  } catch (error) {
    console.log("Error in autoCompleteAndFuzzy search: ", error);
  }
}

async function semanticSearch(searchEmbedding) {
  try {
    console.log("SearchEmbedding values: ", searchEmbedding);
    console.log("SearchEmbedding values length: ", searchEmbedding.length);
    const searchQuery = searchEmbedding;
    const res = await movie.aggregate([
      {
        $vectorSearch: {
          queryVector: searchQuery,
          path: "plot_embedding",
          numCandidates: 100,
          limit: 5,
          index: "vector_plot_index",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          plot: 1,
        },
      },
    ]);
    console.log("Response in semantic search: ", res);
    return res;
  } catch (error) {
    console.log("Error in semantic search function: ", error);
  }
}

async function getQueryEmbedding(query) {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );
    const model1 = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const model2 = genAI.getGenerativeModel({model: "embedding-001"});

    try {
      const result1 = await model1.embedContent(query);
      const result2 = await model2.embedContent(query);
      console.log("Embedding result1: ", result1.embedding.values);
      console.log("Embedding result2: ", result2.embedding.values);
      // const finalResult = result1.embedding.values.map((val, index)=>{return (val+result2.embedding.values[index])/2});
      const finalResult = [...result1.embedding.values, ...result2.embedding.values];
      console.log("Final Result length: ", finalResult.length)
      return finalResult;
    } catch (error) {
      console.log("Error in generating result embeddings: ", error);
      throw new Error("Error in generating result embeddings: ", error);
    }
  } catch (error) {
    console.log("Error in getqueryembedding: ", error);
  }
}

router.get("/search/autocomplete", async function (req, res) {
  const filter = req.query.filter;
  console.log("Filter: ", filter);

  if (!filter || filter.trim() === "") {
    try {
      const result = await movie.find({}).limit(40);
      return res.status(200).json(result);
    } catch (error) {
      console.log("Error in fetching all the movies request: ", error);
      return res
        .status(404)
        .json({ message: "An error occurred while fetching the movies!" });
    }
  } else {
    try {
      const autoCompleteAndFuzzyResult = await autoCompleteAndFuzzySearch(
        filter
      );
      console.log("Autocomplete and fuzzy result: ", autoCompleteAndFuzzyResult);

      const result = { autoCompleteAndFuzzyResult };
      res.status(200).json(result);
    } catch (error) {
      console.log("Error in search endpoint: ", error);
      //   throw new Error("Error in search endpoint: ", error);
      res
        .status(500)
        .json({ message: "An error occurred while processing the request." });
    }
  }
});

router.get("/search/semantic", async function (req, res) {
  const filter = req.query.filter;

  if (!filter || filter.trim() === "") {
    try {
      const result = await movie.find({});
      return res.status(200).json(result);
    } catch (error) {
      console.log("Error in semantic search route: ", error);
      return res
        .status(404)
        .json({ message: "An error occurred while fetching the movies." });
    }
  } else {
    try {
      const searchEmbedding = await getQueryEmbedding(filter);
      const semanticResult = await semanticSearch(searchEmbedding);
      return res.status(200).json(semanticResult);
    } catch (error) {
      console.log("Error in semantic search: ", error);
      return res.status(500).json({
        message: "An error occurred while searching the movies by plot",
      });
    }
  }
});

router.get("/search/:id", async function (req, res) {
  const { id } = req.params;
  const IdString = id.toString();
  const movieIdLength = IdString.length;
  const movieId = IdString.slice(1, movieIdLength);
  console.log("Received ID: " + movieId);
  try {
    const result = await movie.findById(movieId).exec();
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in get request by id: ", error);
  }
});

module.exports = router;
