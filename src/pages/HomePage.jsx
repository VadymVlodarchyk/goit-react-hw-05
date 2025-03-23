
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmQyZjYxYWYyYTgyMWM2ZGVmZWIzMDJkZTM1ZDIyOCIsIm5iZiI6MTc0MjY4MzQyMS4yMzksInN1YiI6IjY3ZGYzZDFkMzBlNjVlN2JlZWM3MDFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vl5PMS3Jf71H7RQI9RJZsyV8dVe4tF6MwX5vqLpaGWA',
          },
        });
        setMovies(res.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
