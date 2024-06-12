import React, { useEffect, useState } from "react";
import Welcome from "../components/welcome";
import MovieList from "../components/movieList";
import { fetchMovie } from "../store/feature/movieSearchSlice";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../store/feature/userSlice";
import { setMovies } from "../store/feature/moviesSlice";
import CryptoJS from "crypto-js";

const SECRET_KEY = "your-secret-key";

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const Home = () => {
  const dispatch = useDispatch();
  const [movieName, setMovieName] = useState("");
  const movieSearchStatus = useSelector((state) => state.movieSearch.status);
  const movieResult = useSelector((state) => state.movieSearch.movie);

  const handleMovieSearch = (e) => {
    e.preventDefault();
    if (movieName.trim()) {
      dispatch(fetchMovie(movieName));
    }
  };

  useEffect(() => {
    // Retrieve user data from local storage on component mount
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedUserData = decryptData(savedUserData);
      dispatch(login(parsedUserData));
      dispatch(setMovies(parsedUserData.movies || []));
    }
  }, [dispatch]);
  return (
    <div class="w-auto mx-8 my-4 overflow-y-visible">
      <Welcome />

      <div class=" items-center justify-center  pl-2 w-full mt-2 p-4 ">
        <div class="flex">
          <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-2 border-gray-200 bg-white p-5">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              class="pointer-events-none absolute w-5 fill-gray-500 transition"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
            </svg>
          </div>
          <form onSubmit={handleMovieSearch} class="flex w-full">
            <input
              type="text"
              class="w-full border-2 bg-white pl-2 text-base font-semibold outline-0"
              placeholder=""
              id=""
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
            <input
              type="submit"
              value="Search"
              class="bg-red-500 p-2  rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
            />
          </form>
        </div>
      </div>
      <MovieList
        movieSearchStatus={movieSearchStatus}
        movieResult={movieResult}
      />
    </div>
  );
};

export default Home;
