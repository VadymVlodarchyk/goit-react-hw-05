
import { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmQyZjYxYWYyYTgyMWM2ZGVmZWIzMDJkZTM1ZDIyOCIsIm5iZiI6MTc0MjY4MzQyMS4yMzksInN1YiI6IjY3ZGYzZDFkMzBlNjVlN2JlZWM3MDFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vl5PMS3Jf71H7RQI9RJZsyV8dVe4tF6MwX5vqLpaGWA',
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return <div>Loading movie...</div>;

  return (
    <div>
      <Link to={backLink.current}>← Go back</Link>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            style={{ borderRadius: '8px' }}
          />
        ) : (
          <div style={{ width: '300px', height: '450px', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            No image
          </div>
        )}
        <div>
          <h2>{movie.title}</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <hr />
      <p>Additional information:</p>
      <ul>
        <li><Link to="cast">Cast</Link></li>
        <li><Link to="reviews">Reviews</Link></li>
      </ul>
      <hr />

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
