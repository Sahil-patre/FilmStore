import axios from "axios";
import { useState, useEffect } from "react";
import { CopyPlus, Trash, Home } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "./constants.js";
import { useParams } from "react-router";

function EditMovie() {
  const { id } = useParams();

  const [movieDetail, setMovieDetail] = useState({
    _id: "",
    title: "",
    description: "",
    images: [],
    category: "",
    director: "",
    year: null,
    language: "",
    rating: 0,
  });

  const [NewMoviePoster, setNewMoviePoster] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Update Movie API
  const updateMovie = async () => {
    await axios.put(`${API_URL}/movies/${id}`, movieDetail);
    toast.success("Movie updated successfully!");

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  // ✅ Load movie details
  const loadMovieDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(`${API_URL}/movies/${id}`);
      setMovieDetail(response.data.data || {});
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Could not load movie details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    loadMovieDetails();
  }, [id]);

  const handleRemoveImage = (imgUrl) => {
    const newImages = movieDetail.images.filter((img) => img !== imgUrl);
    setMovieDetail({ ...movieDetail, images: newImages });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-12 px-4">
      <div className="max-w-3xl mx-auto bg-black/40 border border-gray-700 shadow-xl rounded-2xl p-8 backdrop-blur-md">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-yellow-300">🎬 Edit Movie</h1>

          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition"
          >
            <Home size={20} />
            Home
          </a>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-10">Loading movie…</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="space-y-5">

            <input
              type="text"
              placeholder="Movie Title"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-yellow-400 outline-none"
              value={movieDetail.title}
              onChange={(e) => setMovieDetail({ ...movieDetail, title: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 resize-none focus:border-yellow-400 outline-none"
              rows={4}
              value={movieDetail.description}
              onChange={(e) => setMovieDetail({ ...movieDetail, description: e.target.value })}
            />

            {/* Image Input */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Image URL"
                className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-yellow-400 outline-none"
                value={NewMoviePoster}
                onChange={(e) => setNewMoviePoster(e.target.value)}
              />

              <CopyPlus
                className="text-yellow-400 cursor-pointer hover:text-yellow-300"
                size={36}
                onClick={() => {
                  if (!NewMoviePoster.trim()) return;
                  setMovieDetail({
                    ...movieDetail,
                    images: [...movieDetail.images, NewMoviePoster.trim()],
                  });
                  setNewMoviePoster("");
                }}
              />
            </div>

            {/* Image Preview */}
            <div className="flex flex-wrap gap-4 mt-4">
              {movieDetail.images.map((imgUrl, index) => (
                <div
                  key={index}
                  className="relative w-28 h-36 rounded-lg overflow-hidden border border-gray-700 shadow-lg"
                >
                  <img src={imgUrl} className="w-full h-full object-cover" />

                  <Trash
                    className="absolute right-1 bottom-1 bg-black/70 p-1 text-red-400 rounded cursor-pointer hover:text-red-300"
                    size={18}
                    onClick={() => handleRemoveImage(imgUrl)}
                  />
                </div>
              ))}
            </div>

            {/* Other Inputs */}
            <input
              type="text"
              placeholder="Category"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-yellow-400 outline-none"
              value={movieDetail.category}
              onChange={(e) => setMovieDetail({ ...movieDetail, category: e.target.value })}
            />

            <input
              type="text"
              placeholder="Director"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-yellow-400 outline-none"
              value={movieDetail.director}
              onChange={(e) => setMovieDetail({ ...movieDetail, director: e.target.value })}
            />

            <input
              type="number"
              placeholder="Year"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-yellow-400 outline-none"
              value={movieDetail.year || ""}
              onChange={(e) => setMovieDetail({ ...movieDetail, year: e.target.value })}
            />

            <input
              type="text"
              placeholder="Language"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-yellow-400 outline-none"
              value={movieDetail.language}
              onChange={(e) => setMovieDetail({ ...movieDetail, language: e.target.value })}
            />

            <input
              type="number"
              placeholder="Rating (0–5)"
              className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:border-yellow-400 outline-none"
              value={movieDetail.rating}
              onChange={(e) => setMovieDetail({ ...movieDetail, rating: e.target.value })}
            />

            {/* ✅ Update button */}
            <button
              onClick={updateMovie}
              className="w-full mt-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg text-lg transition transform hover:scale-[1.02]"
            >
              ✅ Update Movie
            </button>

            <Toaster />
          </div>
        )}
      </div>
    </div>
  );
}

export default EditMovie;
