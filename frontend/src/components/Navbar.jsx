import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Film, Search, Menu, LogOut, ChevronDown } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTitleSearch, setIsTitleSearch] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //   const [isSuggestions, setIsSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query === "") {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        if (isTitleSearch) {
          const res = await axios.get(
            "http://localhost:3000/movies/search/autocomplete?filter=" + query
          );
          console.log(res.data);
          // setIsSuggestions(true);
          setSuggestions(res.data.autoCompleteAndFuzzyResult);
        } else {
          const res = await axios.get(
            "http://localhost:3000/movies/search/semantic?filter=" + query
          );
          console.log(res.data);
          // setIsSuggestions(true);
          setSuggestions(res.data);
        }

        console.log("Suggestions: ", suggestions);
      } catch (error) {
        console.log("Error in fetching suggestions: ", error);
      }
    };
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  useEffect(() => {
    console.log("Updated suggestions: ", suggestions);
  }, [suggestions]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSearchTypeChange = (val) => {
    setIsTitleSearch(val);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-black/95 text-white sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                StreamFlix
              </span>
            </Link>
            <div className="hidden md:flex ml-8 space-x-6">
              <Link to="/home" className="hover:text-blue-400">
                Home
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
            <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* {isSearchOpen && (
          <div className="py-4 px-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, TV shows, and more..."
              className="w-full bg-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )} */}
        {isSearchOpen && (
          <div className="relative w-full max-w-2xl">
            <div className="relative flex items-centre">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-l-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isTitleSearch ? "Title" : "Plot"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-32 bg-black rounded-lg shadow-lg z-20">
                    <button
                      onClick={() => handleSearchTypeChange(true)}
                      className="block w-full px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      Title
                    </button>
                    <button
                      onClick={() => handleSearchTypeChange(false)}
                      className="block w-full px-4 py-2 text-sm text-white hover:bg-white/10"
                    >
                      Plot
                    </button>
                  </div>
                )}
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  console.log(query);
                }}
                placeholder="Search movies..."
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {suggestions.length > 0 && (
              <div className="absolute w-full mt-1 bg-black rounded-lg shadow-lg z-10 max-h-[200px] overflow-y-auto">
                {suggestions.map((movie) => (
                  <div
                    key={movie._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuery(movie.title);
                      console.log("Clicked with movieId: ", movie._id);
                      navigate("/MovieDetails/:" + movie._id);
                      setSuggestions([]);
                    }}
                  >
                    <Link to={"/MovieDetails/" + movie._id} key={movie._id}>
                      {movie.title}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* {suggestions.length > 0 && (
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
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
