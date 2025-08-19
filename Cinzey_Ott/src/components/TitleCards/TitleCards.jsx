import './TitleCards.css';
import { Link } from 'react-router-dom';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';


const TitleCards = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(fetchUrl);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, [fetchUrl]);

  const toggleWishlist = (movie) => {
    let updatedWishlist;

    if (wishlist.find(item => item.id === movie.id)) {

      updatedWishlist = wishlist.filter(item => item.id !== movie.id);
    } else {
      const movieData = {
        id: movie.id,
        name: movie.title || movie.name,
        image: `${IMG_BASE_URL}${movie.poster_path}`,
        trailer: movie.id
      };
      updatedWishlist = [...wishlist, movieData];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className='title-cards'>
      <h2>{title}</h2>
      <div className="card-list">
        {movies.map((movie) => (
          <div className="card" key={movie.id}>

            <Link to={`/player/${encodeURIComponent(movie.id)}`}>
              <img
                src={`${IMG_BASE_URL}${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
            </Link>

            <div className="overlay">
              <Link to={`/player/${encodeURIComponent(movie.id)}`} className="play-btn">
                <FaPlay />
              </Link>
              <button
                className={`heart-btn ${wishlist.find(item => item.id === movie.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(movie)}
              >
                <FaHeart />
              </button>
            </div>

            <p>{movie.title || movie.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
