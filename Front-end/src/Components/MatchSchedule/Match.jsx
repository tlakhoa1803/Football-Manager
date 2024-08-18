import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Match.css';

const Match = ({
  homeLogo,
  awayLogo,
  time,
  stadium,
  homeTeam,
  awayTeam,
  homeTeamGoal,
  awayTeamGoal,
  capacity,
  matchId
}) => (
  <div className="match-schedule">
    <div className="match-info">
      <div className="date-time">{time}</div>
      <div className="stadium">{stadium}</div>
    </div>
    <div className="teams-schedule">
      <div className="team-schedule1">
        <img src={homeLogo} alt={`${homeTeam} Logo`} className="team-logo-schedule1" />
        <span className="home-team">{homeTeam}</span>
      </div>
      <div className="score-schedule">
        <Link to={`/match/${matchId}`}>{homeTeamGoal} - {awayTeamGoal}</Link>
      </div>
      <div className="team-schedule2">
        <img src={awayLogo} alt={`${awayTeam} Logo`} className="team-logo-schedule2" />
        <span className="away-team">{awayTeam}</span>
      </div>
    </div>
    <div className="attendance">Attendance: {capacity}</div>
  </div>
);

Match.propTypes = {
  homeLogo: PropTypes.string.isRequired,
  awayLogo: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  stadium: PropTypes.string.isRequired,
  homeTeam: PropTypes.string.isRequired,
  awayTeam: PropTypes.string.isRequired,
  homeTeamGoal: PropTypes.number.isRequired, // Changed from string to number
  awayTeamGoal: PropTypes.number.isRequired, // Changed from string to number
  capacity: PropTypes.string.isRequired,
  matchId: PropTypes.string.isRequired, // Changed from number to string
};

export default Match;