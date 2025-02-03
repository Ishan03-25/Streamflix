import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // const fetchSuggestions = async () => {
    //   if (query.length > 2) {
    //     try {
    //       //   const response = await axios.get(`/api/movies/search?q=${query}`);
    //       const response = await axios.get(
    //         "http://localhost:3000/movies/search?filter=",
    //         query
    //       );
    //       console.log(response.data);
    //       setSuggestions(response.data);
    //     } catch (error) {
    //       console.error("Error fetching suggestions:", error);
    //     }
    //   } else {
    //     setSuggestions([]);
    //   }
    // };

    async function fetchSuggestions() {
        try {
            const res = await axios.get("http://localhost:3000/movies/search?filter="+query);
            console.log(res.data);
            setSuggestions(res.data);
        } catch (error) {
            console.log("Error in fetching suggestions: ", error);
        }
    }
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {setQuery(e.target.value);console.log(query);}}
          placeholder="Search movies..."
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-10">
          {suggestions.map((movie) => (
            <div
              key={movie._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(movie.title);
                setSuggestions([]);
              }}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
