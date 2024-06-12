import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMovies: [],
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.selectedMovies.push(action.payload);
    },
    setMovies: (state, action) => {
      state.selectedMovies = action.payload;
    },
  },
});

export const { addMovie, setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
