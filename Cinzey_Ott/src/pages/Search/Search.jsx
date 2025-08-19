import React, { useEffect, useState } from 'react';
import './Search.css';
import logo from '../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaHeart, FaInfoCircle } from "react-icons/fa";

const Search = () => {
    const [movieAllData, setMovieAllData] = useState([]);
    const [query, setQuery] = useState("");
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem("wishlist")) || []
    );
    const navigate = useNavigate();
    const getMovieData = async (searchQuery) => {
        try {
            if (!searchQuery) {
                setMovieAllData([]);
                return;
            }
            const response = await axios.get(
                `https://www.omdbapi.com/?s=${searchQuery}&apikey=2db30ce7`
            );
            setMovieAllData(response.data.Search || []);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    useEffect(() => {
        if (query.trim() !== "") {
            getMovieData(query);
        } else {
            setMovieAllData([]);
        }
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            getMovieData(query);
        }
    };
    const handlePlay = (movie) => {
        navigate(`/player/${movie.imdbID}`);
    };
    const addToWishlist = (movie) => {
        const updatedWishlist = [...wishlist, movie];
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        alert(`${movie.Title} added to wishlist!`);
    };

    const handleInfo = async (movie) => {
        try {
            const response = await axios.get(
                `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=2db30ce7`
            );
            const details = response.data;

            alert(
                `🎬 ${details.Title} (${details.Year})
📖 Plot: ${details.Plot}
⭐ IMDB Rating: ${details.imdbRating}
🎭 Genre: ${details.Genre}
🎥 Director: ${details.Director}`
            );
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    return (
        <div className="main-container">
            <NavLink to="/">
                <img src={logo} alt="Logo" className="My-logo" />
            </NavLink>

            <div className="search-page">
                <h1>Search Your Favourite</h1>
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for movies, shows..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit">Go</button>
                </form>
            </div>

            <div className="Main-card-container">
                {movieAllData.length > 0 ? (
                    movieAllData.map((movie) => (
                        <div
                            className="search-card"
                            key={movie.imdbID}
                            onMouseEnter={() => setHoveredMovie(movie.imdbID)}
                            onMouseLeave={() => setHoveredMovie(null)}
                        >
                            {hoveredMovie === movie.imdbID ? (
                                <video
                                    className="movie-card"
                                    autoPlay
                                    loop
                                    muted
                                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                                />
                            ) : (
                                <img
                                    className="movie-card"
                                    src={movie.Poster}
                                    alt={movie.Title}
                                />
                            )}

                            {hoveredMovie === movie.imdbID && (
                                <div className="overlay-icons">
                                    <button
                                        className="icon-btn play"
                                        onClick={() => handlePlay(movie)}
                                    >
                                        <FaPlay />
                                    </button>
                                    <button
                                        className="icon-btn wishlist"
                                        onClick={() => addToWishlist(movie)}
                                    >
                                        <FaHeart />
                                    </button>
                                    <button
                                        className="icon-btn info"
                                        onClick={() => handleInfo(movie)}
                                    >
                                        <FaInfoCircle />
                                    </button>
                                </div>
                            )}

                            <div className="movie-info">
                                <p>{movie.Title}</p>
                                <p>{movie.Year}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    query && <p style={{ color: "white" }}>No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
