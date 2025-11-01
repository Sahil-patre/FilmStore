import Movie from '../models/Movie.js';

const getMovies = async (req, res) => {
  const movies = await Movie.find();

  res.json({
    success: true,
    data: movies,
    message: "Movies fetched successfully"
  })
}

const postMovies = async (req, res) => {
  console.log(`Body recieved`, req.body);

  const {
    title,
    description,
    images,
    category,
    director,
    year,
    language,
    rating,
  } = req.body

  if (!title || !description || !category || !director || !year || !language) {
    return res.status(404).json({
      success: false,
      data: null,
      message: "Please provide all required fields",
    });
  }
  try {
    const newMovie = new Movie({
      title,
      description,
      images,
      category,
      director,
      year,
      language,
      rating,
    });

    const saveMovie = await newMovie.save();

    res.status(201).json({
      success: true,
      data: saveMovie,
      message: "Movie added Successfully"
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      data: null,
      message: "Error adding movie:" + error.message,
    })
  }

}

const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);

    if (movie) {
      return res.json({
        success: true,
        data: movie,
        message: "Movie fetched successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Movie not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Invalid movie ID",
    });
  }
};

const getMoviesSearch = async (req, res) => {
  const { q } = req.query;

  const movies = await Movie.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  });

  if (movies.length === 0) {
    return res.status(404).json({
      success: false,
      data: [],
      message: "No movies found matching your search",
    });
  } else {
    return res.json({
      success: true,
      data: movies,
      message: "Movies fetched successfully",
    });
  }
};

const putMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      images,
      category,
      director,
      year,
      language,
      rating,
    } = req.body;

    await Movie.updateOne(
      { _id: id },
      {
        title,
        description,
        images,
        category,
        director,
        year,
        language,
        rating,
      }
    );

    const updatedMovie = await Movie.findById(id);

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found!",
      });
    }

    res.json({
      success: true,
      data: updatedMovie,
      message: "Movie updated successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const putMovieRatingsById = async (req, res) => {
  const { id } = req.params;

  const { rating } = req.body;

  if (rating < 0 || rating > 5) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Rating should be between 0 and 5"
    })
  }

  await Movie.updateOne({ _id: id }, { rating });

  const updatedMovie = await Movie.findById(id);

  return res.json({
    success: true,
    data: updatedMovie,
    message: "Movie rating updated successfully"
  });
}

const deleteMovieById = async (req, res) => {
  const { id } = req.params;

  await Movie.deleteOne({ _id: id });

  return res.json({
    success: true,
    data: null,
    message: "Movie deleted successfully"
  })
}


export { getMovies, postMovies, getMovieById, getMoviesSearch, putMovieById, putMovieRatingsById, deleteMovieById };