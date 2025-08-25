import React, { useEffect, useState } from 'react';
import './Search.css';
import logo from '../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaInfoCircle } from "react-icons/fa";

const Search = () => {
    const [movieAllData, setMovieAllData] = useState([]);
    const [query, setQuery] = useState(localStorage.getItem("lastQuery") || "");
    const [hoveredMovie, setHoveredMovie] = useState(null);
    const navigate = useNavigate();

    const TMDB_API_KEY = "79671df01fbe69abe0e1e3b9492eb10e";

    const getMovieData = async (searchQuery) => {
        try {
            if (!searchQuery) {
                setMovieAllData([]);
                return;
            }
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`
            );
            setMovieAllData(response.data.results || []);
            localStorage.setItem("lastQuery", searchQuery);
            localStorage.setItem("lastResults", JSON.stringify(response.data.results || []));
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };

    useEffect(() => {
        const savedResults = JSON.parse(localStorage.getItem("lastResults"));
        if (savedResults && savedResults.length > 0) {
            setMovieAllData(savedResults);
        } else if (query.trim() !== "") {
            getMovieData(query);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            getMovieData(query);
        }
    };

    const handlePlay = (movie) => {
        navigate(`/player/${movie.id}`);
    };

    const handleInfo = async (movie) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=en-US`
            );
            const details = response.data;

            alert(
                `🎬 ${details.title} (${details.release_date?.slice(0, 4)})
📖 Plot: ${details.overview}
⭐ Rating: ${details.vote_average}
🎭 Genre: ${details.genres.map(g => g.name).join(", ")}
🎥 Runtime: ${details.runtime} min`
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
                            key={movie.id}
                            onMouseEnter={() => setHoveredMovie(movie.id)}
                            onMouseLeave={() => setHoveredMovie(null)}
                        >
                            <img
                                className="movie-card"
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : "https://via.placeholder.com/500x750?text=No+Image"
                                }
                                alt={movie.title}
                            />

                            {hoveredMovie === movie.id && (
                                <div className="overlay-icons">
                                    <button
                                        className="icon-btn play"
                                        onClick={() => handlePlay(movie)}
                                    >
                                        <FaPlay />
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
                                <p>{movie.title}</p>
                                <p>{movie.release_date?.slice(0, 4)}</p>
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
