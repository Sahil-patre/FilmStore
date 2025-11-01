function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="space-y-4">
          <div className="text-6xl md:text-8xl animate-bounce">
            🎬
          </div>
          <h1 className="text-7xl md:text-9xl font-bold text-red-600">
            4🎥4
          </h1>
          <div className="flex justify-center space-x-4 text-4xl md:text-6xl animate-pulse">
            <span>🍿</span>
            <span>🎪</span>
            <span>🎫</span>
          </div>
          <p className="text-xl md:text-2xl text-gray-400 mt-4">
            Oops! Looks like this scene didn't make the final cut!
          </p>
          <div className="mt-6 space-y-2">
            <p className="text-gray-500">
              <span className="text-2xl">🎯</span> Scene Not Found
            </p>
            <p className="text-gray-500">
              <span className="text-2xl">🎬</span> Take {Math.floor(Math.random() * 100)}
            </p>
          </div>
          <a
            href="/"
            className="inline-block mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-200 transform hover:scale-105"
          >
            🎪 Back to Main Stage
          </a>
        </div>
        <div className="mt-12 text-gray-600">
          <p className="animate-pulse">
            🌟 FilmStore Productions 🌟
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
