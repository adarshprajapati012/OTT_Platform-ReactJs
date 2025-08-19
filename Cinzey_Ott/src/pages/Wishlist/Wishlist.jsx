import { useEffect, useState } from "react";
import "./Wishlist.css";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container">
         <NavLink to="/">
                <img src={logo} alt="Logo" className="My-logo" />
            </NavLink>
    <div className="wishlist-page">
      <h2>My Wishlist ❤️</h2>
      {wishlist.length === 0 ? (
        <p>No movies added to wishlist yet.</p>
      ) : (
        <div className="wishlist-list">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <Link to={`/player/${encodeURIComponent(item.trailer)}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <p>{item.name}</p>
              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default Wishlist;
