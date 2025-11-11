import { Link } from "react-router";
import { Rat, Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../views/constants.js";
import Rating from "./Ratings.jsx";


function MovieCard({ _id, title, images, category, year, rating ,loadMovies }) {

  const deleteMovie = ()=>{
    const response = axios.delete(`${API_URL}/movies/${_id}`);
    toast.success("Movie deleted successfully");
    loadMovies();
  };

  const imgSrc =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <Link
      to={`/movies/${_id}`}
      className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300 w-64 relative"
    >
      {/* Movie Poster */}
      <img src={imgSrc} alt={title} className="h-80 w-full object-cover" />

      {/* Category Badge */}
      <span className="absolute top-3 left-3 bg-amber-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        {category}
      </span>

      {/* Movie Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{title}</h2>
        <Trash className="text-red-500 inline-block absolute top-3 right-3" onClick={(e)=>{
          deleteMovie();
          e.preventDefault();
          e.stopPropagation();
        }} />
        <p className="text-sm text-gray-400 mt-1">{year}</p>

        {/* Rating Stars */}
        <div className="flex items-center mt-2 text-amber-400 text-xl">
          <Rating rating={rating} />
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;