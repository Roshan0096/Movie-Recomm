import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieDetails, fetchMovieCast } from '../services/api';

export const getMovies = createAsyncThunk(
  'movies/getMovies',
  async ({ type, page }) => {
    const response = await fetchMovies(type, page);
    return response.data;
  }
);

export const getMovieDetails = createAsyncThunk(
  'movies/getMovieDetails',
  async (movieId) => {
    const details = await fetchMovieDetails(movieId);
    const cast = await fetchMovieCast(movieId);
    return { ...details.data, cast: cast.data.cast };
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page }) => {
    const response = await fetchMovies('search', page, query);
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    details: null,
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
