import React, { useEffect, useState } from "react";
import "./Category.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const TMDB_KEY = "79671df01fbe69abe0e1e3b9492eb10e";
const IMG = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w342${path}`
    : "https://via.placeholder.com/342x513?text=No+Image";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.status_message || "API Error");
        setMovies(data.results || []);
      } catch (e) {
        setErr("❌ Failed to load Movies.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="parent-category-page">
      <NavLink to="/">
        <img src={logo} alt="Logo" className="My-logo" />
      </NavLink>

      <div className="category-page">
        <h2>🎬 My Movies</h2>

        {loading && <p className="muted">Loading…</p>}
        {err && <p className="error">{err}</p>}

        <div className="category-list">
          {movies.map((m) => (
            <div
              className="category-card"
              key={m.id}
              onClick={() => setSelectedMovie(m)}
            >
              <img src={IMG(m.poster_path)} alt={m.title} className="poster" />
              <p className="title">{m.title}</p>
              <p className="sub">{m.release_date?.slice(0, 4) || "—"}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedMovie && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-left">
              <img
                src={IMG(selectedMovie.poster_path)}
                alt={selectedMovie.title}
                className="popup-poster"
              />
            </div>
            <div className="popup-right">
              <h2 className="popup-title">{selectedMovie.title}</h2>

              <div className="popup-grid">
                <div className="field">
                  <span className="label">Release</span>
                  <span className="value">
                    {selectedMovie.release_date || "N/A"}
                  </span>
                </div>
                <div className="field">
                  <span className="label">Rating</span>
                  <span className="value">
                    {selectedMovie.vote_average || "N/A"}
                  </span>
                </div>
              </div>

              <div className="overview">
                <span className="label">Overview</span>
                <p className="overview-text">
                  {selectedMovie.overview || "No description available."}
                </p>
              </div>

              <div className="actions">
                <button className="btn-ghost" onClick={() => setSelectedMovie(null)}>
                  Close
                </button>
                <NavLink to="/" className="btn-ghost">
                  Go Back
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
