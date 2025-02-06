// import { Play, Plus, X } from "lucide-react";
// import Navbar from "../components/Navbar";
// import VideoPlayer from "../components/VideoPlayer";
// import { useEffect, useState } from "react";
// import axios from "axios";
// // import SearchBar from '../components/SearchBar';

// const Home = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [movies, setMovies] = useState([]);
// //   const [movieGenre, setMovieGenre] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const featuredMovie = {
//     title: "Dune: Part Two",
//     description:
//       "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
//     image:
//       "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
//     videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
//   };

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/movies/all");
//         console.log("Response in fetching all movies: ", res.data);
//         // console.log("Response data: ",res.data);
//         setMovies(res.data);
//       } catch (error) {
//         console.log("Error in fetching movies all: ", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   useEffect(() => {
//     // const uniqueCategories = [];

//     // for (let i = 0; i < movies.length; i++) {
//     //   setMovieGenre(movies[i].genre);
//     //   for (let j = 0; j < movieGenre.length; j++) {
//     //     if (!uniqueCategories.includes(movieGenre[j])) {
//     //       uniqueCategories.push(movieGenre[j]);
//     //     }
//     //   }
//     //   setMovieGenre([]);
//     // }

//     // setCategories(uniqueCategories);

//     if (movies.length > 0){
//         const uniqueCategories = new Set();
//         movies.forEach((movie) => {
//             movie.genres.forEach((genre) => {
//                 uniqueCategories.add(genre);
//             })
//         })
//         setCategories(Array.from(uniqueCategories));
//     }
//   }, [movies]);

//   useEffect(() => {
//     console.log("Movies: ", movies);
//     console.log("Categories: ", categories);
//   });

//   // useEffect(()=>{
//   //   console.log("Movies: ", movies);
//   // }, [movies]);

//   // const categories = [
//   //   {
//   //     title: "Trending Now",
//   //     movies: [
//   //       {
//   //         id: 1,
//   //         title: "Inception",
//   //         image:
//   //           "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
//   //       },
//   //       {
//   //         id: 2,
//   //         title: "Interstellar",
//   //         image:
//   //           "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=450&fit=crop",
//   //       },
//   //       {
//   //         id: 3,
//   //         title: "The Matrix",
//   //         image:
//   //           "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=300&h=450&fit=crop",
//   //       },
//   //       {
//   //         id: 4,
//   //         title: "Blade Runner",
//   //         image:
//   //           "https://images.unsplash.com/photo-1485163819542-13adeb5e0068?w=300&h=450&fit=crop",
//   //       },
//   //       {
//   //         id: 5,
//   //         title: "Avatar",
//   //         image:
//   //           "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=300&h=450&fit=crop",
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     title: "New Releases",
//   //     movies: [
//   //       {
//   //         id: 6,
//   //         title: "The Batman",
//   //         image:
//   //           "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop",
//   //       },
//   //       {
//   //         id: 7,
//   //         title: "Oppenheimer",
//   //         image:
//   //           "https://images.unsplash.com/photo-1532293064366-5af2be8e4505?w=300&h=450&fit=crop",
//   //       },
//   //       {
//   //         id: 8,
//   //         title: "Barbie",
//   //         image:
//   //           "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=300&h=450&fit=crop",
//   //       },
//   //       {
//   //         id: 9,
//   //         title: "Top Gun",
//   //         image:
//   //           "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?w=300&h=450&fit=crop",
//   //       },
//   //       {
//   //         id: 10,
//   //         title: "Mad Max",
//   //         image:
//   //           "https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?w=300&h=450&fit=crop",
//   //       },
//   //     ],
//   //   },
//   // ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="min-h-screen bg-[#141414]">
//         {/* Hero Section */}
//         <div className="relative h-[80vh] w-full">
//           <div className="absolute inset-0">
//             <img
//               src={featuredMovie.image}
//               alt={featuredMovie.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
//           </div>

//           <div className="relative h-full flex items-center">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//               <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
//                 {featuredMovie.title}
//               </h1>
//               <p className="text-lg text-gray-200 max-w-2xl mb-8">
//                 {featuredMovie.description}
//               </p>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => {
//                     setIsPlaying(true);
//                     console.log(isPlaying);
//                   }}
//                   className="flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
//                 >
//                   <Play className="h-5 w-5 mr-2" />
//                   Play Now
//                 </button>
//                 <button className="flex items-center px-6 py-3 bg-gray-500/30 text-white rounded-lg hover:bg-gray-500/40 transition-colors">
//                   <Plus className="h-5 w-5 mr-2" />
//                   Add to Watchlist
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {isPlaying && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
//             <div className="relative w-full max-w-4xl">
//               {/* Close Button */}
//               <button
//                 onClick={() => setIsPlaying(false)}
//                 className="absolute top-4 right-4 bg-gray-900 text-white rounded-full p-2 z-50"
//               >
//                 <X className="h-6 w-6" />
//               </button>

//               {/* Video Player */}
//               <VideoPlayer videoUrl={featuredMovie.videoUrl} />
//             </div>
//           </div>
//         )}

//         {/* Movie Categories */}
//         <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
//           {categories.map((category, index) => (
//             <div key={index} className="mb-12">
//               <h2 className="text-2xl font-bold text-white mb-6">{category}</h2>
//               {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"> */}
//               <div className="relative">
//                 <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
//                   {movies.map((movie) => (
//                     <div
//                       key={movie.id}
//                       className="relative group cursor-pointer"
//                     >
//                       <img
//                         src={movie.poster}
//                         alt={movie.title}
//                         className="w-full aspect-[2/3] object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
//                       />
//                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
//                         <button
//                           onClick={() => setIsPlaying(true)}
//                           className="flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
//                         >
//                           <Play className="h-12 w-12 text-white" />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { Play, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import VideoPlayer from "../components/VideoPlayer";
import { useEffect, useState } from "react";
import axios from "axios";
import {l as loginCheck} from "../pages/Login";

const Home = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [movies, setMovies] = useState([]);
  const [categories, setCategories] = useState([]);

  const featuredMovie = {
    title: "Dune: Part Two",
    description:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&h=1080&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  };
  useEffect(() => {
    // localStorage.removeItem("token");
    const token = localStorage.getItem("token");
    console .log(loginCheck);
    console.log(token);
    if (token&&loginCheck==1) {
      console.log(token);
      const fetchMovies = async () => {
        try {
          const res = await axios.get("http://localhost:3000/movies/all");
          setMovies(res.data);
        } catch (error) {
          console.log("Error in fetching movies all: ", error);
        }
      };

      fetchMovies();
    } else {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const uniqueCategories = new Set();
      movies.forEach((movie) => {
        if (Array.isArray(movie.genres)) {
          movie.genres.forEach((genre) => {
            uniqueCategories.add(genre);
          });
        }
      });
      setCategories(Array.from(uniqueCategories));
    }
  }, [movies]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="min-h-screen bg-[#141414]">
        {/* Hero Section */}
        <div className="relative h-[80vh] w-full">
          <div className="absolute inset-0">
            <img
              src={featuredMovie.image}
              alt={featuredMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
          </div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {featuredMovie.title}
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl mb-8">
                {featuredMovie.description}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Play Now
                </button>
                <button className="flex items-center px-6 py-3 bg-gray-500/30 text-white rounded-lg hover:bg-gray-500/40 transition-colors">
                  <Plus className="h-5 w-5 mr-2" />
                  Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {isPlaying && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="relative w-full max-w-4xl">
              {/* Close Button */}
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-4 right-4 bg-gray-900 text-white rounded-full p-2 z-50"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Video Player */}
              <VideoPlayer videoUrl={featuredMovie.videoUrl} />
            </div>
          </div>
        )}

        {/* Movie Categories */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          {categories.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-6">{category}</h2>
              <div className="relative">
                {/* Horizontal Scroll Container */}
                <div className="flex space-x-4 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {movies
                    .filter((movie) => movie.genres.includes(category))
                    .map((movie) => (
                      <div
                        key={movie.id}
                        className="flex-shrink-0 w-48 relative group cursor-pointer"
                      >
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <button
                            onClick={() => setIsPlaying(true)}
                            className="flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
                          >
                            <Play className="h-12 w-12 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
