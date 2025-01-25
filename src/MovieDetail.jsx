import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams(); // Get movie ID from the route
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const movieData = `https://www.omdbapi.com/?apikey=1607e3b9&i=${id}`;
      try {
        const response = await axios.get(movieData);
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      }
    };
    fetchMovieDetail();
  }, [id]);

  return (
    <div className="bg-red-800">
      <div className="w-[90%] mx-auto py-[5rem]">
        {error && <p className="text-red-500">{error}</p>}
        {movie ? (
          <div className="flex flex-col gap-[2rem] items-center">
            <h1 className="text-3xl font-bold">{movie.Title}</h1>
            <img
              className="w-[18rem] h-[25rem] object-cover rounded-lg"
              src={movie.Poster}
              alt={movie.Title}
            />
            <p className="text-lg">{movie.Plot || "No plot available"}</p>
            <div className="text-sm text-black">
              <span className="font-bold">Released:</span> {movie.Released || "N/A"}
            </div>
            <div className="text-sm text-black">
              <span className="font-bold">Genre:</span> {movie.Genre || "N/A"}
            </div>
            <div className="text-sm text-black">
              <span className="font-bold">Ratings:</span> {movie.imdbRating || "N/A"}
            </div>
            <div className="text-sm text-black">
              <span className="font-bold">Cast:</span> {movie.Actors || "N/A"}
            </div>
          </div>
        ) : (
          <div className="text-black">Loading movie details...</div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
