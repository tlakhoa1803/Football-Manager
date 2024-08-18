import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MatchInfo from './MatchInfo';
import PlayerStats from './PlayerStats';
import './PG.css';

const MatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentMatch, setCurrentMatch] = useState(null);
  const [matchId, setMatchId] = useState(0); // Add this line

  useEffect(() => {
    fetch(`http://localhost:8888/match/statistic/${id}`)
      .then(response => response.json())
      .then(data => setCurrentMatch(data))
      .catch(error => console.error(`Error: ${error}`));
  }, [id]);

  const handleNext = () => {
    setMatchId(prevMatchId => prevMatchId + 1); // Update this line
    navigate(`/match/${matchId}`);
  };

  const handlePrevious = () => {
    setMatchId(prevMatchId => prevMatchId - 1); // Update this line
    navigate(`/match/${matchId}`);
  };

  if (!currentMatch) {
    return <div>Match not found</div>;
  }

  return (
    <div className="match-page">
      <MatchInfo match={currentMatch} />
      <PlayerStats match={currentMatch} />
      <div className="button-container">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default MatchPage;