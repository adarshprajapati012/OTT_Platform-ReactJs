import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = "79671df01fbe69abe0e1e3b9492eb10e"; 

const Player = () => {
  const { trailer } = useParams(); 
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${trailer}/videos?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();

        if (data.results && data.results.length > 0) {
         
          const trailerObj = data.results.find(
            (vid) => vid.type === "Trailer" && vid.site === "YouTube"
          ) || data.results[0];

          if (trailerObj) {
            setVideoUrl(`https://www.youtube.com/embed/${trailerObj.key}`);
          }
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [trailer]);

  return (
    <div className='player'>
      <img
        className="player-back-arrow"
        src={back_arrow}
        alt="Back"
        onClick={() => navigate(-1)}
      />

      {videoUrl ? (
        <iframe
          width="90%"
          height="90%"
          src={videoUrl}
          title='Trailer'
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ color: "white", fontSize: "18px" }}>Trailer not available</p>
      )}
    </div>
  );
};

export default Player;
