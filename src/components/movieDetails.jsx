import React from "react";

const MovieDetail = ({ isOpen, onClose, movieInfo }) => {
  if (!isOpen || !movieInfo) return null;

  const handleClose = () => {
    onClose();
  };

  return (
    <div class="fixed inset-0 z-20 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full max-h-full">
        <div class="p-4">
          <div class="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white">
            <div class="w-full">
              <div class="m-2 my-10 max-w-[400px] mx-auto">
                <div class="mb-4">
                  <h1 class="mb-4 text-3xl font-extrabold">
                    Movie Details
                  </h1>
                </div>
                <div class="flex flex-wrap gap-4 p-4 bg-gray-100">
                  <div class="bg-white shadow-md h-full rounded-lg p-4 w-full ">
                    <h2 class="text-xl font-bold mb-2">
                      {movieInfo.Title}
                    </h2>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Year:</strong> {movieInfo.Year}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Released:</strong> {movieInfo.Released}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Runtime:</strong> {movieInfo.Runtime}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Genre:</strong> {movieInfo.Genre}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Director:</strong> {movieInfo.Director}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Writer:</strong> {movieInfo.Writer}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Actors:</strong> {movieInfo.Actors}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Plot:</strong> {movieInfo.Plot}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Language:</strong> {movieInfo.Language}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Country:</strong> {movieInfo.Country}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>Ratings:</strong> {movieInfo.Ratings?.map((rating) => rating.Value).join(", ")}
                    </p>
                    <p class="text-sm text-gray-600 mb-1">
                      <strong>IMDb Rating:</strong> {movieInfo.imdbRating}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  class="p-3 bg-white border rounded-full w-full font-semibold mt-4"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

