import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./../components/MovieCard.jsx";

function Home() {
  const [movies, setMovies] = useState([]);

  const loadMovies = async () => {
    const response = await axios.get("http://localhost:8080/movies");
    setMovies(response.data.data);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default Home;