import React, { useEffect, useState, useEffect as ReactUseEffect } from "react";
import "./Category.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const TMDB_KEY = "79671df01fbe69abe0e1e3b9492eb10e";
const IMG = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w342${path}`
    : "https://via.placeholder.com/342x513?text=No+Image";

const fmtDate = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "N/A");

export default function TvShows() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&page=1`
        );
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setItems(Array.isArray(data.results) ? data.results : []);
      } catch (e) {
        setErr("Failed to load TV shows. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    if (selected) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

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
            <button
              key={s.id}
              className="category-card"
              onClick={() => setSelected(s)}
              aria-label={`Open details for ${s.name}`}
            >
              <img src={IMG(s.poster_path)} alt={s.name} className="poster" />
              <p className="title">{s.name}</p>
              <p className="sub">{s.first_air_date?.slice(0, 4) || "—"}</p>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="popup-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} details`}
          onClick={() => setSelected(null)}
        >
          <div
            className="popup-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="popup-left">
              <img
                src={IMG(selected.poster_path)}
                alt={selected.name}
                className="popup-poster"
              />
            </div>

            <div className="popup-right">
              <h3 className="popup-title">{selected.name}</h3>

              <div className="popup-grid">
                <div className="field">
                  <span className="label">First Air Date</span>
                  <span className="value">{fmtDate(selected.first_air_date)}</span>
                </div>
                <div className="field">
                  <span className="label">Rating</span>
                  <span className="value">
                    {Number(selected.vote_average || 0).toFixed(1)} / 10
                  </span>
                </div>
                <div className="field">
                  <span className="label">Language</span>
                  <span className="value">
                    {(selected.original_language || "N/A").toUpperCase()}
                  </span>
                </div>
                <div className="field">
                  <span className="label">Country</span>
                  <span className="value">
                    {Array.isArray(selected.origin_country) && selected.origin_country.length
                      ? selected.origin_country.join(", ")
                      : "—"}
                  </span>
                </div>
              </div>

              <div className="overview">
                <span className="label">Overview</span>
                <p className="overview-text">
                  {selected.overview || "No description available."}
                </p>
              </div>

              <div className="extra">
                <span className="label">Extra Info</span>
                <p className="extra-text">
                  This series has 10 years of audience experience & fan following 🚀
                </p>
              </div>

              <div className="actions">
                <button className="btn-ghost" onClick={() => setSelected(null)}>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
