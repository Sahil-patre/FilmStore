import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Ratings from "../components/Ratings.jsx";
import img404 from "../assets/404.png";
import { API_URL } from "./constants.js";

function MovieDetails() {
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
    rating: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const changeRating = async (newRating) => {
    setMovieDetail({ ...movieDetail, rating: newRating });
    await axios.patch(`${API_URL}/movies/${id}/rating`, { rating: newRating });
  }

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

  // Rating expected 0–5
  const ratingValue = Math.max(
    0,
    Math.min(5, Math.round(movieDetail.rating ?? 0))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-black/60 via-black/40 to-black/60 border border-gray-800 rounded-2xl p-6 md:p-10 shadow-xl">
          {loading ? (
            <div className="flex items-center justify-center h-72">
              <div className="text-center text-gray-400">
                <div className="text-6xl animate-pulse">🍿</div>
                <p className="mt-4">Loading the feature presentation…</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <img
                src={img404}
                alt="Not found"
                className="mx-auto w-48 h-48 object-contain"
              />
              <h3 className="text-2xl text-red-500 mt-4">{error}</h3>
              <Link
                to="/"
                className="inline-block mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
              >
                🏠 Back to Home
              </Link>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Poster */}
              <div className="md:w-1/3 w-full">
                <div className="rounded-lg overflow-hidden shadow-2xl border border-gray-700">
                  <img
                    src={
                      movieDetail.images && movieDetail.images.length
                        ? movieDetail.images[0]
                        : img404
                    }
                    alt={movieDetail.title}
                    className="w-full h-96 object-cover bg-gray-800"
                  />
                </div>

                {/* Thumbnails */}
                <div className="mt-4 flex gap-3">
                  {(movieDetail.images || []).slice(1, 5).map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`thumb-${idx}`}
                      className="w-20 h-12 object-cover rounded-md border border-gray-700"
                    />
                  ))}
                </div>
              </div>

              {/* Movie Details */}
              <div className="md:w-2/3 w-full text-gray-200">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-300 flex items-center gap-3">
                      <span className="text-3xl">🎞️</span>{" "}
                      {movieDetail.title || "Untitled"}
                    </h1>

                    <p className="text-sm text-gray-400 mt-1">
                      {movieDetail.category || "Unknown"} •{" "}
                      {movieDetail.year || "—"} • {movieDetail.language || "—"}
                    </p>
                  </div>

                  {/* Rating Stars (use Ratings component) */}
                  <div className="text-right">
                    <div className="flex items-center justify-end text-amber-400 text-xl">
                      <Ratings
                        rating={movieDetail.rating}
                        onClick={(newRating) => {
                            changeRating(newRating);
                        }}
                      />
                    </div>

                    <div className="mt-1 text-sm text-gray-400">
                      Rating:{" "}
                      <span className="text-yellow-400 font-semibold">
                        {typeof movieDetail.rating === "number"
                          ? movieDetail.rating.toFixed(1)
                          : movieDetail.rating || "NR"}
                      </span>
                      /5
                    </div>
                  </div>
                </div>

                {/* Synopsis */}
                <div className="mt-6 bg-gradient-to-b from-black/40 to-black/30 p-4 rounded-lg border border-gray-800">
                  <h3 className="text-lg font-semibold text-gray-100">
                    Synopsis
                  </h3>
                  <p className="mt-2 text-gray-300 leading-relaxed">
                    {movieDetail.description ||
                      "No synopsis available for this title."}
                  </p>
                </div>

                {/* Extra Info */}
                <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="space-y-2">
                    <p className="text-gray-400">Director</p>
                    <p className="text-white">{movieDetail.director || "—"}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400">Language</p>
                    <p className="text-white">{movieDetail.language || "—"}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400">Category</p>
                    <p className="text-white">{movieDetail.category || "—"}</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-400">Year</p>
                    <p className="text-white">{movieDetail.year || "—"}</p>
                  </div>
                </div>

                {/* ✅ Only Back to Home (buttons removed) */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/"
                    className="inline-block px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg"
                  >
                    🏠 Back to Home
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-gray-500">
            🌟 FilmStore — Enjoy the show!
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
