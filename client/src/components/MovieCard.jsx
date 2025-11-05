function MovieCard({ title, images, category, year, rating }) {
  const imgSrc =
    Array.isArray(images) && images.length > 0
      ? images[0]
      : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300 w-64">
      <img
        src={imgSrc}
        alt={title}
        className="h-80 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{title}</h2>
        <p className="text-sm text-gray-400 mt-1">{category} • {year}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-yellow-400 font-semibold">⭐ {rating || "N/A"}</span>
          <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-full">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
