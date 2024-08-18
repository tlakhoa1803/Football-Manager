import React, { useState, useEffect } from 'react';
import Match from './Match';
import TurnSelection from './TurnSelect';
import SeasonSelection from './SeasonSelection';
import './Match.css';

const Schedule = () => {
  const [selectedSeason, setSelectedSeason] = useState('2023-2024');
  const [selectedTurn, setSelectedTurn] = useState('all');
  const [matchesData, setMatchesData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8888/match_result/all')
      .then(response => response.json())
      .then(data => setMatchesData(data.data))
      .catch(error => console.error(`Error: ${error}`));
  }, []);

  const seasons = matchesData && matchesData.length > 0 ? [...new Set(matchesData.map(match => match.seaSon))] : [];
  const turns = matchesData && matchesData.length > 0 ? [...new Set(matchesData.filter(match => match.seaSon === selectedSeason).map(match => match.matchRound))] : [];

  const filteredMatches = matchesData && matchesData.length > 0
    ? matchesData
      .filter(match => match.seaSon === selectedSeason && (selectedTurn === 'all' || match.matchRound === selectedTurn))
      .sort((a, b) => Number(a.matchRound) - Number(b.matchRound))
    : [];


  return (
    <div className="schedule">
      <h1 className='titlesche'>Vô địch Quốc gia Night Wolf {selectedSeason === '2023-2024' ? '2023-2024' : '2022-2023'}</h1>
      <div className="selections-container">
        <TurnSelection
          turns={turns}
          selectedTurn={selectedTurn}
          onTurnChange={setSelectedTurn}
        />
        <SeasonSelection
          seasons={seasons}
          selectedSeason={selectedSeason}
          onSeasonChange={setSelectedSeason}
        />
      </div>
      {filteredMatches.map((match, index) => (
  <Match
    key={index}
    homeLogo={match.homeLogo}
    awayLogo={match.awayLogo}
    time={match.time}
    stadium={'SVD ' + match.stadium}
    homeTeam={match.homeTeam}
    awayTeam={match.awayTeam}
    homeTeamGoal={match.homeTeamGoal.toString()} // Convert to string
    awayTeamGoal={match.awayTeamGoal.toString()} // Convert to string
    capacity={match.capacity}
    matchId={match.matchId} // Already a string
  />
))}
    </div>
  );
};

export default Schedule;