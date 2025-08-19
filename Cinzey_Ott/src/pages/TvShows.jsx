import React, { useEffect, useState } from "react";
import "./Category.css";
import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom';

const TMDB_KEY = "79671df01fbe69abe0e1e3b9492eb10e";
const IMG = (path) => (path ? `https://image.tmdb.org/t/p/w342${path}` : "https://via.placeholder.com/342x513?text=No+Image");

const TvShows = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1`
        );
        const data = await res.json();
        setItems(data.results || []);
      } catch (e) {
        setErr("Failed to load TV shows.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="parent-category-page">
      <NavLink to="/">
        <img src={logo} alt="Logo" className="My-logo" />
      </NavLink>
      <div className="category-page">
        <h2>TV Shows</h2>

        {loading && <p className="muted">Loading…</p>}
        {err && <p className="error">{err}</p>}

        <div className="category-list">
          {items.map((s) => (
            <div className="category-card" key={s.id}>
              <img src={IMG(s.poster_path)} alt={s.name} className="poster" />
              <p className="title">{s.name}</p>
              <p className="sub">{s.first_air_date?.slice(0, 4) || "—"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvShows;
