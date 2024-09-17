import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/moviesSlice';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';

const UpcomingPage = () => {
  const dispatch = useDispatch();
  const { list, loading, error, currentPage, totalPages } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(getMovies({ type: 'upcoming', page: 1 }));
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(getMovies({ type: 'upcoming', page }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="upcoming-page">
      <h1>Upcoming Movies</h1>
      <MovieList movies={list} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UpcomingPage;