//https://cinzey-ott-ap.netlify.app/
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Price from './pages/Price/Price';
import Player from './pages/Player/Player';
import Search from './pages/Search/Search';
import Wishlist from './pages/Wishlist/Wishlist';
import TvShows from './pages/TvShows';
import Movies from './pages/Movies';
import NewPopular from './pages/NewPopular';
const App = () => {
  const url = "http://www.omdbapi.com/?i=tt3896198&apikey=2db30ce7"
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/price' element={<Price />} />
        <Route path="/player/:trailer" element={<Player />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/tv_shows" element={<TvShows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/new" element={<NewPopular />} />
      </Routes>
    </div>
  );
};

export default App;
