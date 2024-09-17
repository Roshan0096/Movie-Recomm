import axios from 'axios';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchMovies = (type, page = 1, query = '') => {
  let url = '/movie/popular';
  if (type === 'top_rated') url = '/movie/top_rated';
  if (type === 'upcoming') url = '/movie/upcoming';
  if (type === 'search') url = '/search/movie';

  return api.get(url, {
    params: {
      page,
      query: type === 'search' ? query : undefined,
    },
  });
};

export const fetchMovieDetails = (movieId) => {
  return api.get(`/movie/${movieId}`);
};

export const fetchMovieCast = (movieId) => {
  return api.get(`/movie/${movieId}/credits`);
};