import React, { useState, useEffect, useCallback } from 'react';
import './Banner.css';

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const banners = [
    "https://vpf.vn/wp-content/uploads/2024/04/Intro-VLeague1-2324.png",
    "https://vpf.vn/wp-content/uploads/2023/10/Intro-VLeague2-2324.png",
    "https://vpf.vn/wp-content/uploads/2024/04/Intro-CupQG-2324.png"
  ];

  const nextBanner = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setCurrentBanner((currentBanner + 1) % banners.length);
      setFadeOut(false);
    }, 500);
  }, [currentBanner, banners.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextBanner();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextBanner]);

  const prevBanner = useCallback(() => {
    setFadeOut(true);
    setTimeout(() => {
      setCurrentBanner((currentBanner - 1 + banners.length) % banners.length);
      setFadeOut(false);
    }, 500);
  }, [currentBanner, banners.length]);

  return (
    <div className="banner-container">
      <button onClick={prevBanner} className="banner-button banner-button-left">◀</button>
      <span>
        <img
          src={banners[currentBanner]}
          alt={`Banner ${currentBanner + 1}`}
          className={fadeOut ? 'fade-out' : ''}
        />
      </span>
      <button onClick={nextBanner} className="banner-button banner-button-right">▶</button>
    </div>
  );
};

export default Banner;
