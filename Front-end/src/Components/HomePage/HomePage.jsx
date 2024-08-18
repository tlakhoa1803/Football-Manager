import React from 'react';
import FootballSchedule from './FootballSchedule.jsx';
import Banner from './Banner.jsx';
import News from './News.jsx';
import Ranking from './Ranking.jsx';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <FootballSchedule />
      <Banner />
      <div className="main-content">
        <News />
        <Ranking />
      </div>
    </div>
  );
};

export default HomePage;
