import React, { useState, useEffect } from 'react';
import './FootballSchedule.css';

const FootballSchedule = () => {
  const [activeLeague, setActiveLeague] = useState('night-wolf');
  const [startIndex, setStartIndex] = useState(0);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8888/match/result_score/1`)
      .then(response => response.json())
      .then(data => setMatches(data.data))
      .catch(error => console.error(`Error: ${error}`));
  }, []);

  const handleLeagueClick = (league) => {
    setActiveLeague(league);
    setStartIndex(0); // Reset to the first group of matches when league changes
  };

  const handlePrevClick = () => {
    if (matches && matches.length > 0) {
      setStartIndex((prevIndex) => (prevIndex === 0 ? matches.length - 3 : prevIndex - 1));
    }
  };

  const handleNextClick = () => {
    if (matches && matches.length > 0) {
      setStartIndex((prevIndex) => (prevIndex + 3 >= matches.length ? 0 : prevIndex + 1));
    }
  };

  // Check if matches is not empty before calling slice and accessing length
  const displayedMatches = matches && matches.length > 0 ? matches.slice(startIndex, startIndex + 3) : [];

  return (
    <div className="schedule-container">
      <div className="headers">
        <div
          className={`header night-wolf ${activeLeague === 'night-wolf' ? 'active' : ''}`}
          onClick={() => handleLeagueClick('night-wolf')}
        >
          <img src="./assets/Logo_Vleague1_2023.svg.png" alt="icon"/>
          <div className="title">VÔ ĐỊCH QUỐC GIA NIGHT WOLF 2023/24</div>
          {activeLeague === 'night-wolf' && <div className="triangle"></div>}
        </div>
        <div
          className={`header sao-vang ${activeLeague === 'sao-vang' ? 'active' : ''}`}
          onClick={() => handleLeagueClick('sao-vang')}
        >
          <img src="./assets/Logo_V.League_2_2023.svg.png" alt="icon"/>
          <div className="title">HẠNG NHẤT QUỐC GIA BIA SAO VÀNG 2023/24</div>
          {activeLeague === 'sao-vang' && <div className="triangle"></div>}
        </div>
        <div
          className={`header casper ${activeLeague === 'casper' ? 'active' : ''}`}
          onClick={() => handleLeagueClick('casper')}
        >
          <img src="./assets/cup-quoc-gia-casper.png" alt="icon"/>
          <div className="title">CÚP QUỐC GIA CASPER 2023/24</div>
          {activeLeague === 'casper' && <div className="triangle"></div>}
        </div>
      </div>

      <div className="matches">
        <button className="arrow left-arrow" onClick={handlePrevClick}>‹</button>
        {displayedMatches && displayedMatches.map((match, index) => ( // Check if displayedMatches is not undefined before calling map
          <div key={index} className="match">
            <div className="round">{'Vòng ' + match.matchRound}</div>
            <div className="date-time">{match.time}</div>
            <div className="venue">{'SVD ' + match.stadium}</div>
            <div className="teams">
              <div className="team">
                <div className="team-name">{match.homeTeamName}</div>
                <img src={match.homeLogo} alt={match.homeTeamName} className="team-logo"/>
              </div>
              <div className="score">{match.score}</div>
              <div className="team">
              <div className="team-name">{match.awayTeamName}</div>
                <img src={match.awayLogo} alt={match.awayTeamName} className="team-logo"/>
              </div>
            </div>
            {/*<div className="broadcast">{match.broadcast}</div>*/}
          </div>
        ))}
        <button className="arrow right-arrow" onClick={handleNextClick}>›</button>
      </div>
    </div>
  );
}

export default FootballSchedule;