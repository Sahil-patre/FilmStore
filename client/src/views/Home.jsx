import axios from "axios";
import { use, useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import MovieCard from "./../components/MovieCard.jsx";
import img404 from "../assets/404.png";
import { API_URL } from "./constants.js";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/movies`);
      setMovies(response.data.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const searchMovies = async () => {
    if (!search.trim()) {
      loadMovies();
      return;
    }

    toast.loading("Searching...", { id: "searching" });
    setLoading(true);

    try {
      const response = await axios.get(
        `${API_URL}/movies/search?q=${search}`
      );
      toast.dismiss();
      setMovies(response.data.data);
      setError("");
    } catch (error) {
      console.log(error);
      toast.dismiss();
      toast.error(error.response.data.message, { id: "error" });
      setMovies([]);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchMovies();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4 flex items-center justify-center gap-3">
            <span className="text-4xl">🎬</span> FilmStore
          </h1>
          <p className="text-gray-400 text-lg">Discover your next favorite movie</p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full max-w-xl bg-gradient-to-r from-black/60 via-black/40 to-black/60 border border-gray-700 rounded-xl px-4 py-3 focus-within:border-yellow-400/50 transition-colors">
            <input
              type="text"
              placeholder="Search for a movie..."
              className="bg-transparent flex-grow text-gray-200 placeholder-gray-500 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon className="text-yellow-400 cursor-pointer" />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-gradient-to-r from-black/60 via-black/40 to-black/60 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
          {loading ? (
            <div className="flex items-center justify-center h-72">
              <div className="text-center text-gray-400">
                <div className="text-6xl animate-pulse">🍿</div>
                <p className="mt-4">Loading the feature presentation…</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <img src={img404} alt="No results found" className="mx-auto mb-4 w-48 h-48"/>
              <h3 className="text-2xl text-red-500 mt-4">{error}</h3>
            </div>
          ) : movies.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎭</div>
              <h3 className="text-xl text-gray-400">No movies found matching your search.</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {movies.map((movieObj) => {
                const { _id, title, images, category, year, rating } = movieObj;
                return (
                  <MovieCard
                    _id={_id}
                    key={_id}
                    title={title}
                    images={images}
                    category={category}
                    year={year}
                    rating={rating}
                    loadMovies={loadMovies}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500">
          🌟 FilmStore — Your Premier Movie Destination
        </div>
      </div>
      <Toaster position="top-right"/>
    </div>
  );
}

export default Home;