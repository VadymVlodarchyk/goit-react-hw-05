
import { useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmQyZjYxYWYyYTgyMWM2ZGVmZWIzMDJkZTM1ZDIyOCIsIm5iZiI6MTc0MjY4MzQyMS4yMzksInN1YiI6IjY3ZGYzZDFkMzBlNjVlN2JlZWM3MDFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vl5PMS3Jf71H7RQI9RJZsyV8dVe4tF6MwX5vqLpaGWA',
        },
      });
      setMovies(res.data.results);
      setNotFound(res.data.results.length === 0);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  return (
    <div>
      <h1>Movie search</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search movies..."
          style={{ padding: '8px', width: '250px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Search</button>
      </form>
      {notFound ? <p>No movies found</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
