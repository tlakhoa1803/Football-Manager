import React, { useState, useEffect } from 'react';
import './Ranking.css';
import {Link} from "react-router-dom";

const Ranking = () => {
  const [selectedSeason] = useState('2023-2024');
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8888/summary/${selectedSeason}`)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.data
          .slice()
          .sort((a, b) => {
            if (b.points === a.points) {
              return b.goal_difference - a.goal_difference;
            }
            return b.points - a.points;
          })
          .map((team, index) => ({ ...team, stt: index + 1 }));
        setRankings(sortedData);
      })
      .catch(error => console.error(`Error: ${error}`));
  }, [selectedSeason]);

  return (
    <aside className="ranking">
      <h2>Bảng xếp hạng</h2>
      <div className="ranking-header">
        <button className="ranking-button">V.League</button>
        <button className="ranking-button">Hạng nhất</button>
      </div>
      <div className="ranking-table">
        <div className="ranking-header-row">
          <span>VT</span>
          <span>Đội bóng</span>
          <span>Trận</span>
          <span>HS</span>
          <span>Điểm</span>
        </div>
        {rankings.map((team) => (
          <div key={team.stt} className="ranking-row">
            <span>{team.stt}</span>
            <div className="team-info-rank">
              <img src={team.logoLink} alt={team.shorthand} className="team-logo-mini" />
              <span>{team.shorthand}</span>
            </div>
            <span>{team.matchPlayed}</span>
            <span>{team.goalDifference}</span>
            <span>{team.points}</span>
          </div>
        ))}
      </div>
      <Link to="/league-table" className="view-more">Xem chi tiết ➔</Link>
    </aside>
  );
};

export default Ranking;