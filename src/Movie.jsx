import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // For pagination
  const [loading, setLoading] = useState(false); // To manage loading state
  const [searchQuery, setSearchQuery] = useState("game"); // Default search query
  const [searchInput, setSearchInput] = useState(""); // Input value for search
  const [type, setType] = useState("movie"); // Type selection (movie, series, episode)
  const navigate = useNavigate();

  const fetchMovies = async (currentPage, query, selectedType) => {
    const movieData = `https://www.omdbapi.com/?apikey=1607e3b9&type=${selectedType}&s=${query}&page=${currentPage}`;

    try {
      setLoading(true);
      const response = await axios.get(movieData);
      const newMovies = response.data.Search || [];
      setMovies(currentPage === 1 ? newMovies : [...movies, ...newMovies]); // Replace or append movies
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch movies.");
      console.error("Error fetching movies:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page, searchQuery, type); // Fetch movies based on the current search query and selected type
  }, [page, searchQuery, type]); // Trigger fetch when page, search query or type changes

  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchQuery(searchInput); // Update the search query
      setPage(1); // Reset to the first page
      setMovies([]); // Clear the movies list for new search
    }
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1); // Increment page for pagination
  };

  const handleKnowMore = (id) => {
    navigate(`/movieDetail/${id}`);
  };

  return (
    <div className="bg-red-800">
      
      {/* Dropdown to select type (movie, series, episode) */}
      <div className="w-[95%] mx-auto py-[2rem] flex gap-[1rem] justify-between items-center">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)} // Update the selected type
          className="py-2 px-4 rounded border border-gray-300"
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>

        {/* Search Bar */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for movies..."
          className="flex-1 py-2 px-4 rounded border border-gray-300"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // Trigger search on Enter key
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white py-2 px-4 rounded hover:bg-slate-400"
        >
          Search
        </button>
      </div>

      {/* Movies List */}
      <div className="w-[90%] mx-auto flex gap-[1rem] flex-wrap justify-between py-[2rem]">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="flex flex-col gap-[1rem] border border-red-700 bg-red-600 p-4 rounded-lg shadow-lg w-[18rem] h-[35rem] justify-between"
          >
            {/* Movie Title */}
            <span className="font-semibold text-lg text-center line-clamp-2">
              {movie.Title}
            </span>

            {/* Movie Poster */}
            <img
              className="w-full h-[25rem] object-cover rounded-lg"
              src={movie.Poster}
              alt={movie.Title}
            />

            {/* Know More Button */}
            <button onClick={() => handleKnowMore(movie.imdbID)}>
              Know more...
            </button>
          </div>
        ))}
      </div>

      {loading && <p className="text-center text-white">Loading...</p>}
      {!loading && movies.length > 0 && (
        <div className="text-center">
          <button
            onClick={loadMoreMovies}
            className="bg-black text-white py-2 px-4 rounded hover:bg-slate-400"
          >
            Load More
          </button>
        </div>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default MovieList;
