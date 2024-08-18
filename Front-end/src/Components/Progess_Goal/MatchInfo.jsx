// MatchInfo.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './MatchInfo.css';


const MatchInfo = ({ match }) => {
  if (!match) return null;

  return (
      <div className="info-match">
      <h1 className="title_match">{match.homeTeam.name} vs {match.awayTeam.name}</h1>
      <div className="time_text">
        <div>{'Thời gian: '+match.time}</div>
        <div>{'SVĐ ' + match.stadium}</div>
        <div>{'Khán giả: ' +match.capacity +' người'}</div>
      </div>
      <div className="scoreboard">
        <div className="team-info">
          <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="team-logo" />
          <div className="team-name">{match.homeTeam.name}</div>
        </div>
        <div className="score_team">
          <span>{match.homeTeam.goals}</span>
          <span>-</span>
          <span>{match.awayTeam.goals}</span>
        </div>
        <div className="team-info">
          <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="team-logo" />
          <div className="team-name">{match.awayTeam.name}</div>
        </div>
      </div>
    </div>
  );
};

MatchInfo.propTypes = {
  match: PropTypes.shape({
    homeTeam: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      goals: PropTypes.number.isRequired
    }).isRequired,
    awayTeam: PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      goals: PropTypes.number.isRequired
    }).isRequired,
    time: PropTypes.string.isRequired,
    stadium: PropTypes.string.isRequired,
    capacity: PropTypes.string.isRequired
  }).isRequired
};

export default MatchInfo;