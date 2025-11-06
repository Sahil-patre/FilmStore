import axios from "axios";
import { use, useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import MovieCard from "./../components/MovieCard.jsx";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadMovies = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/movies`);
    setMovies(response.data.data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const searchMovies = async () => {
  toast.loading("Searching...", { id: "searching" });

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/movies/search?q=${search}`
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
  }
};

  useEffect(() => {
    searchMovies();
  }, [search]);

  return (
    <div>

    <div className="flex justify-center mt-6">
  <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 w-80 bg-gray-100 focus-within:ring-2 focus-within:ring-blue-400">
    <input
      type="text"
      placeholder="Search for a movie..."
      className="bg-transparent flex-grow text-gray-800 placeholder-gray-500 focus:outline-none"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <SearchIcon className="text-blue-500 cursor-pointer" />
  </div>
  
</div>

{error ? <div className="text-red-500 text-center mt-4">{error}</div> : null}

      <div className="flex flex-wrap gap-6 justify-around p-6">
      {movies.map((movieObj) => {
        const { _id, title, images, category, year, rating } = movieObj;
        return (
          <MovieCard
            key={_id}
            title={title}
            images={images}
            category={category}
            year={year}
            rating={rating}
          />
        );
      })}
    </div>
    <Toaster position="top-right"/>
    </div>
  );
}

export default Home;