import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import hero1 from '../../assets/HeroImg1.png';
import hero2 from '../../assets/HeroImg2.jpg';
import hero3 from '../../assets/HeroImg3.jpg';
import hero4 from '../../assets/HeroImg4.jpg';
import hero5 from '../../assets/HeroImg5.jpg';

import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const API_KEY = "79671df01fbe69abe0e1e3b9492eb10e";

const Home = () => {
  const heroData = [
    {
      img: hero1,
      title: 'STRANGER THINGS',
      desc: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
      trailer: "https://www.youtube.com/watch?v=jxASX_tgy7E"
    },
    {
      img: hero2,
      title: 'MONEY HEIST',
      desc: 'A criminal mastermind who goes by "The Professor" has a plan to pull off the biggest heist in recorded history.',
      trailer: "https://www.youtube.com/watch?v=_InqQJRqGW4"
    },
    {
      img: hero3,
      title: 'REACHER',
      desc: 'Reacher travels to Maine in search of a deadly foe from his past and ends up entangled with rogue DEA agents and a mysterious family business.',
      trailer: "https://www.youtube.com/watch?v=_l6Lt_srTQY"
    },
    {
      img: hero4,
      title: 'THE WITCHER',
      desc: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world.',
      trailer: "https://www.youtube.com/watch?v=22I7mcoyovM"
    },
    {
      img: hero5,
      title: 'THE LION KING',
      desc: 'Tricked into thinking he killed his father, a guilt ridden lion cub flees into exile and abandons his identity as the future King.',
      trailer: "https://www.youtube.com/watch?v=7TavVZMewpY"
    }
  ];

  const handlePlay = (trailerUrl) => {
    window.open(trailerUrl, "_blank");
  };

  return (
    <div className='home'>
      <Navbar />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="hero-swiper"
      >
        {heroData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="hero">
              <img className='hero_banner' src={item.img} alt={item.title} />
              <div className="hero-caption">
                <h1 className='hero-title'>{item.title}</h1>
                <p>{item.desc}</p>
                <div className="hero-banner-btn">
                  <button
                    className='btn'
                    onClick={() => handlePlay(item.trailer)}
                  >
                    <img src={play_icon} alt="" /> Play
                  </button>
                  <button className='btn info-btn'>
                    <img src={info_icon} alt="" /> More Info
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="more-card">
        <TitleCards
          title="Trending Now"
          fetchUrl={`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`}
        />

        <TitleCards
          title="Popular Movies"
          fetchUrl={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`}
        />

        <TitleCards
          title="TV Shows"
          fetchUrl={`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`}
        />

        <TitleCards
          title="Top Rated"
          fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
        />

        <TitleCards
          title="Upcoming"
          fetchUrl={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`}
        />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
