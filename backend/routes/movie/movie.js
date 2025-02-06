const express = require("express");
const { movie } = require("../../db");

const router = express.Router();

router.get("/all", async function (req, res) {
  try {
    const movies = await movie.find({}).limit(150);
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

// async function semanticSearch(search) {

// }

router.get("/search", async function (req, res) {
  const filter = req.query.filter;

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
      // const semanticResult = await semanticSearch(filter);

      // const result = {
      //   autoCompleteAndFuzzySearch: autoCompleteAndFuzzyResult,
      //   semanticSearch: semanticResult,
      // };

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

router.get("/search/:id", async function(req, res) {
    const {id} = req.params;
    const IdString = id.toString();
    const movieIdLength = IdString.length;
    const movieId = IdString.slice(1, movieIdLength);
    console.log("Received ID: "+movieId);
    try {
        const result = await movie.findById(movieId).exec();
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log("Error in get request by id: ", error);
    }
})

module.exports = router;
