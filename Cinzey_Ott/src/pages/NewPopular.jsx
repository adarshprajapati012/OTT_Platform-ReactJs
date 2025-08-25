import React, { useEffect, useState } from "react";
import "./Category.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const TMDB_KEY = "79671df01fbe69abe0e1e3b9492eb10e";
const IMG = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w342${path}`
    : "https://via.placeholder.com/342x513?text=No+Image";

const NewPopular = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.status_message || "API Error");
        setItems(data.results || []);
      } catch (e) {
        setErr("❌ Failed to load New & Popular.");
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  return (
    <div className="parent-category-page">
      <NavLink to="/">
        <img src={logo} alt="Logo" className="My-logo" />
      </NavLink>

      <div className="category-page">
        <h2>🔥 New & Popular</h2>

        {loading && <p className="muted">Loading…</p>}
        {err && <p className="error">{err}</p>}

        <div className="category-list">
          {items.map((it) => (
            <div
              className="category-card"
              key={it.id}
              onClick={() => setSelectedItem(it)}
            >
              <img
                src={IMG(it.poster_path)}
                alt={it.title || it.name}
                className="poster"
              />
              <p className="title">{it.title || it.name}</p>
              <p className="sub">
                {(it.release_date || it.first_air_date || "").slice(0, 4) || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-left">
              <img
                src={IMG(selectedItem.poster_path)}
                alt={selectedItem.title || selectedItem.name}
                className="popup-poster"
              />
            </div>
            <div className="popup-right">
              <h2 className="popup-title">{selectedItem.title || selectedItem.name}</h2>

              <div className="popup-grid">
                <div className="field">
                  <span className="label">Release</span>
                  <span className="value">
                    {selectedItem.release_date || selectedItem.first_air_date || "N/A"}
                  </span>
                </div>
                <div className="field">
                  <span className="label">Rating</span>
                  <span className="value">
                    {selectedItem.vote_average || "N/A"}
                  </span>
                </div>
              </div>

              <div className="overview">
                <span className="label">Overview</span>
                <p className="overview-text">
                  {selectedItem.overview || "No description available."}
                </p>
              </div>

              <div className="actions">
                <button className="btn-ghost" onClick={() => setSelectedItem(null)}>
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

export default NewPopular;
