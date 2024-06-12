import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import LoginModal from "./loginModal";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/feature/userSlice";
import { setMovies } from "../store/feature/moviesSlice";
import { fetchMovieDetails, clearMovie } from "../store/feature/movieSearchSlice";
import MovieDetail from "./movieDetails";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const selectedMovies = useSelector((state) => state.movies.selectedMovies);
  const movieDetails = useSelector((state) => state.movieSearch.movieDetails);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const logOut = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    // Clear user data from state but keep it in local storage
    dispatch(logout());
    dispatch(setMovies([]));
  };

  const handleSaveList = (movieTitle) => {
    setIsMovieModalOpen(true);
    dispatch(fetchMovieDetails(movieTitle));
  };

  const closeMovieModal = () => {
    setIsMovieModalOpen(false);
  };

  return (
    <div class="w-40% py-2 px-4 h-auto border-r-stone-300 border-r-2">
      <h1 class="text-red-500 m-2 text-3xl font-bold">Watchlists</h1>

      <Link to="/">
        <button
          onClick={() => dispatch(clearMovie())}
          class="bg-red-600 rounded text-white h-10 max-w-md mx-auto mt-10 w-full flex justify-start p-2 px-16"
        >
          <MdHome class="w-10 h-6" />
          Home
        </button>
      </Link>

      <div class="h-[2px] w-full bg-neutral-300 mt-4"></div>
      <h3 class="text-xl px-2 pt-2 font-medium">My List</h3>

      {userData ? (
        <>
          <ul class="h-96 px-1 mt-2 rounded justify-between overflow-y-auto border-2">
            {selectedMovies.length > 0 ? (
              <>
                {selectedMovies.map((movie, index) => (
                  <li
                    class="p-2 rounded border-2 mt-2 cursor-pointer"
                    key={index}
                    onClick={() => handleSaveList(movie)}
                  >
                    {movie}
                  </li>
                ))}
              </>
            ) : (
              <>
                <h2 class="text-xl p-2 text-red-600 font-medium">
                  Your watchlist is empty!!
                </h2>
              </>
            )}
          </ul>
        </>
      ) : (
        <></>
      )}
      <ul>
        {userData ? (
          <>
            <button
              onClick={logOut}
              class="bg-slate-500 mt-10 rounded justify-center text-white h-10 max-w-md mx-auto w-full flex p-2"
            >
              {userData.username.split("@")[0]}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={openModal}
              class="bg-slate-500 mt-[30rem] rounded justify-center text-white h-10 max-w-md mx-auto w-full flex p-2"
            >
              Guest
            </button>
          </>
        )}
        {userData ? (
          <>
            <button
              onClick={handleLogout}
              class="hover:bg-red-600 text-black mt-2 rounded justify-center hover:text-white h-10 max-w-md mx-auto w-full flex p-2"
            >
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </ul>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />

      {movieDetails && (
        <MovieDetail
          isOpen={isMovieModalOpen}
          onClose={closeMovieModal}
          movieInfo={movieDetails}
        />
      )}
    </div>
  );
};

export default Sidebar;
