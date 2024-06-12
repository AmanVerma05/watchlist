import React, { useState, useEffect } from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../store/feature/moviesSlice";
import { fetchMovieDetails } from "../store/feature/movieSearchSlice";
import CryptoJS from "crypto-js";
import MovieDetail from "./movieDetails";

const SECRET_KEY = "your-secret-key";
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const MovieList = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const movieSearchStatus = useSelector((state) => state.movieSearch.status);
  const selectedMovies = useSelector((state) => state.movies.selectedMovies);
  const userData = useSelector((state) => state.user.userData);
  const movieDetails = useSelector((state) => state.movieSearch.movieDetails);
  const movieResult = useSelector((state) => state.movieSearch.movies);

  const handleMovieSelect = (movie) => {
    if (movie) {
      if (selectedMovies.includes(movie.Title)) {
        alert("This movie is already in your playlist");
      } else {
        dispatch(addMovie(movie.Title));
        const updatedUserData = {
          ...userData,
          movies: [...selectedMovies, movie.Title],
        };
        localStorage.setItem(userData.username, encryptData(updatedUserData));
      }
    }
  };

  const openModalDetails = (movieTitle) => {
    setIsModalOpen(true);
    dispatch(fetchMovieDetails(movieTitle));
  };

  const closeModalDetails = () => {
    setIsModalOpen(false);
  };

  const warning = () => {
    alert("You are not Logged In!!");
  };

  return (
    <div class="h-full w-[70rem] p-3 pt-0">
      {movieSearchStatus === "loading" && <p>Loading...</p>}
      {movieSearchStatus === "failed" && <p>Movie not found</p>}
      <div class="flex-wrap flex gap-11 justify-start mt-4">
        {movieResult?.map((movie, key) => (
          <div key={key} class="relative flex w-60 flex-col rounded-xl border-2 text-gray-700 shadow-xl hover:shadow-2xl">
            <div class="relative h-72 p-2 overflow-hidden rounded-t-xl text-gray-700">
              {userData ? (
                <BsBookmarkPlusFill
                  onClick={() => handleMovieSelect(movie)}
                  class="absolute h-14 w-10 z-10 hover:bg-lime-500 rounded"
                />
              ) : (
                <BsBookmarkPlusFill
                  onClick={warning}
                  class="absolute h-14 w-10 z-10 hover:bg-lime-500 rounded"
                />
              )}
              <img
                src={movie.Poster}
                class="h-full w-full object-cover"
                alt=""
                onClick={() => openModalDetails(movie.Title)}
              />
            </div>
            <div class="p-4" onClick={() => openModalDetails(movie.Title)}>
              <div class="mb-1 flex items-center justify-between">
                <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {movie.Title}
                </p>
                <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                  {movie.value}
                </p>
              </div>
              <p class="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
                {movie.Year}
              </p>
            </div>
          </div>
        ))}
      </div>
      {movieDetails && (
        <MovieDetail
          isOpen={isModalOpen}
          onClose={closeModalDetails}
          movieInfo={movieDetails}
        />
      )}
    </div>
  );
};

export default MovieList;
