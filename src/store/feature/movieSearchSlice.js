import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "your_api_key";

// Async thunk to fetch movie list based on search term
export const fetchMovie = createAsyncThunk(
  "movieSearch/fetchMovie",
  async (movieName) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`
    );
    if (response.data.Response === "True") {
      return response.data.Search;
    } else {
      throw new Error("Movie not found");
    }
  }
);

// Async thunk to fetch detailed movie information
export const fetchMovieDetails = createAsyncThunk(
  "movieSearch/fetchMovieDetails",
  async (movieName) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`
    );
    if (response.data.Response === "True") {
      return response.data;
    } else {
      throw new Error("Movie details not found");
    }
  }
);

const movieSearchSlice = createSlice({
  name: "movieSearch",
  initialState: {
    movies: null,
    movieDetails: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearMovie: (state) => {
      state.movies = null;
      state.status = "idle";
      state.error = null;
    },
    clearMovieDetails: (state) => {
      state.movieDetails = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearMovie, clearMovieDetails } = movieSearchSlice.actions;

export default movieSearchSlice.reducer;
