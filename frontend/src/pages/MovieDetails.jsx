import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  console.log("Movie ID: ", id);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/movies/search/" + id
        );
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#141414] text-white p-8">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="min-h-screen bg-[#141414] text-white p-8">
        <div className="max-w-7xl mx-auto">
          {/* Movie Poster and Basic Info */}
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full md:w-1/3 rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
              <p className="text-gray-400 mb-4">{movie.year}</p>
              <p className="text-lg mb-4">{movie.fullplot}</p>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Play
                </button>
                <button className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Director:</p>
                <p className="text-white">{movie.directors.join(", ")}</p>
              </div>
              <div>
                <p className="text-gray-400">Cast</p>
                <p className="text-white">{movie.cast.join(", ")}</p>
              </div>
              <div>
                <p className="text-gray-400">Genre:</p>
                <p className="text-white">{movie.genres.join(", ")}</p>
              </div>
              <div>
                <p className="text-gray-400">Rating:</p>
                <p className="text-white">{movie.imdb.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
