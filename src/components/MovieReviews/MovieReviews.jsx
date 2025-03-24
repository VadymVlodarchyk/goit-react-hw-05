
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMmQyZjYxYWYyYTgyMWM2ZGVmZWIzMDJkZTM1ZDIyOCIsIm5iZiI6MTc0MjY4MzQyMS4yMzksInN1YiI6IjY3ZGYzZDFkMzBlNjVlN2JlZWM3MDFlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vl5PMS3Jf71H7RQI9RJZsyV8dVe4tF6MwX5vqLpaGWA',
          },
        });
        setReviews(res.data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <ul>
      {reviews.length > 0 ? (
        reviews.map(review => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </ul>
  );
};

export default MovieReviews;
