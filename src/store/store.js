import { configureStore } from '@reduxjs/toolkit';
import userReducer from './feature/userSlice';
import moviesReducer from './feature/moviesSlice';
import movieSearchReducer from './feature/movieSearchSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    movieSearch: movieSearchReducer,
  },
});

export default store;
