import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmQyZjYxYWYyYTgyMWM2ZGVmZWIzMDJkZTM1ZDIyOCIsIm5iZiI6MTc0MjY4MzQyMS4yMzksInN1YiI6IjY3ZGYzZDFkMzBlNjVlN2JlZWM3MDFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vl5PMS3Jf71H7RQI9RJZsyV8dVe4tF6MwX5vqLpaGWA';

export const fetchSearchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });

  return response.data;
};
