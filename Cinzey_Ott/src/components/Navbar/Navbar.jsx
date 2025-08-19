import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import myLogo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import heart_icon from '../../assets/heart_icon3.png';
import profileImg from '../../assets/profile_img.png';
import dropdown_icon from '../../assets/dropdown_icon.svg';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='navbar'>

      <span
        className='three-line-icon'
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </span>

      <div className='navbar-left'>
        <NavLink to="/"><img src={myLogo} alt='Logo' /></NavLink>
        <ul className={menuOpen ? "menu-active" : ""}>
          <li><NavLink to="/tv_shows" onClick={() => setMenuOpen(false)}>TV Shows</NavLink></li>
          <li><NavLink to="/movies" onClick={() => setMenuOpen(false)}>Movies</NavLink></li>
          <li><NavLink to="/new" onClick={() => setMenuOpen(false)}>New & Popular</NavLink></li>
          <li><NavLink to="/price" onClick={() => setMenuOpen(false)}>Price</NavLink></li>
        </ul>
      </div>

      <div className='navbar-right'>
        <img
          className='icons'
          src={search_icon}
          alt='search'
          onClick={() => navigate('/search')}
        />

        <img
          className='icons heart_icon'
          src={heart_icon}
          alt='favorites'
          onClick={() => navigate('/wishlist')}
        />

        <div className='navbar-profile'>
          <img
            onClick={() => navigate('/login')}
            className='profile-Img'
            src={profileImg}
            alt='profile'
          />
          <img className='profile-dropdown' src={dropdown_icon} alt='dropdown' />
          <div className='dropdown'>
            <p>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
