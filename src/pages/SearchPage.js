import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../redux/moviesSlice';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const dispatch = useDispatch();
  const { list, loading, error, currentPage, totalPages } = useSelector(state => state.movies);

  useEffect(() => {
    if (query) {
      dispatch(searchMovies({ query, page: 1 }));
    }
  }, [dispatch, query]);

  const handlePageChange = (page) => {
    dispatch(searchMovies({ query, page }));
};

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

return (
  <div className="search-page">
    <h1>Search Results for "{query}"</h1>
    {list.length > 0 ? (
      <>
        <MovieList movies={list} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    ) : (
      <p>No results found for "{query}"</p>
    )}
  </div>
);
};

export default SearchPage;