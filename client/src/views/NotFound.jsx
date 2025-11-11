function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="text-center bg-black/40 border border-gray-700 rounded-3xl p-10 shadow-2xl backdrop-blur-lg">
        <div className="space-y-6">
          <div className="text-6xl md:text-8xl animate-bounce">🎬</div>

          <h1 className="text-7xl md:text-9xl font-extrabold text-red-500 drop-shadow-lg">
            4🎥4
          </h1>

          <div className="flex justify-center space-x-6 text-5xl md:text-6xl animate-pulse">
            <span>🍿</span>
            <span>🎪</span>
            <span>🎫</span>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Oops! Looks like this scene didn't make the final cut!
          </p>

          <div className="mt-6 space-y-2 text-gray-400 text-lg">
            <p>
              <span className="text-2xl">🎯</span> Scene Not Found
            </p>
            <p>
              <span className="text-2xl">🎬</span> Take {Math.floor(Math.random() * 100)}
            </p>
          </div>

          <a
            href="/"
            className="inline-block mt-8 px-10 py-4 bg-red-600 hover:bg-red-700 text-white text-lg rounded-full transition duration-200 transform hover:scale-105 shadow-lg"
          >
            🎪 Back to Main Stage
          </a>
        </div>

        <div className="mt-10 text-gray-500 text-sm">
          <p className="animate-pulse">🌟 FilmStore Productions 🌟</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
