import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from '../redux/moviesSlice';

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, loading, error } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!details) return null;

  return (
    <div className="movie-detail-page">
      <div className="movie-info">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title}
        />
        <div className="movie-details">
          <h1>{details.title}</h1>
          <p>{details.overview}</p>
          <p>Release Date: {details.release_date}</p>
          <p>Rating: {details.vote_average}/10</p>
        </div>
      </div>
      <div className="movie-cast">
        <h2>Cast</h2>
        <div className="cast-list">
          {details.cast.slice(0, 5).map(actor => (
            <div key={actor.id} className="cast-member">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;