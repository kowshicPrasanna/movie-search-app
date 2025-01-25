import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";
import avatar from "./assets/avatar.svg"

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black py-[2rem]">
        <nav className="flex justify-between items-center text-white w-[95%] mx-auto">
          <span className="font-serif text-[2rem]">YoMovies</span>
          <span className="flex gap-[2rem]">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-gray font-bold" : "hover:text-gray-300"
              }
            >
              Home
            </NavLink>
          </span>
          <span className="flex gap-[1rem]">Account <img className="w-[2rem]" src={avatar} alt="" /></span>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Movie />} />
        <Route path="/movieDetail/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
