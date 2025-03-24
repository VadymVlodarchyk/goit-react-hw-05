import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';
import SearchForm from '../components/SearchForm/SearchForm';

import { fetchSearchMovies } from '../../services/api';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (searchQuery) => {
    setSearchParams({ query: searchQuery });
  };

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchSearchMovies(query);
        setMovies(data.results);
      } catch (err) {
        setError('Не вдалося завантажити фільми. Спробуйте пізніше.');
        console.log(err);
        
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Завантаження...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
