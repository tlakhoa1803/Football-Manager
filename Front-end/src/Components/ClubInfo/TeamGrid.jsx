import React, { useState, useEffect } from 'react';
import './TeamGrid.css';
import SeasonSelector from './SeasonSelect';
import { Link } from 'react-router-dom';

const TeamGrid = () => {
  const [selectedSeason, setSelectedSeason] = useState("2023-2024");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8888/club-list/${selectedSeason}`);
        const data = await response.json();
        console.log(data); // Step 1
        setTeams(data.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, [selectedSeason]);

  return (
    <div>
      <h1 className='title-teaminfo'>Vô địch quốc gia</h1>
      <SeasonSelector selectedSeason={selectedSeason} onSeasonChange={setSelectedSeason}/>
      <div className="team-grid">
        {teams.map((team, index) => {
          console.log(team); // Step 3
          return (
            <Link key={index} to={`/team/${team.id}?season=${selectedSeason}`} className="team-link">
              <div className="team-card-grid">
                <img src={team.logo} alt={team.nameClub}/>
                <p className='Team-name-grid'>{team.nameClub}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default TeamGrid;