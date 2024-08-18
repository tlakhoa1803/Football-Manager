import React, { useState, useEffect } from 'react';
import './Players.css';
import { useParams } from 'react-router-dom';

const Player = () => {
  const { playerId } = useParams();
  const [activeTab, setActiveTab] = useState('player');
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8888/club/player/${playerId}`)
      .then(response => response.json())
      .then(data => {
        setPlayer(data.data); // directly set the player data to the state
      })
      .catch(error => console.error(`Error: ${error}`));
  }, [playerId]);

  if (!player) {
    return <div>Player not found</div>;
  }

  const playerInfo = (
    <div className="player-info">
      <img src={player.linkLogo} alt={player.name} />
      <div>
        <p>Họ và tên: {player.name}</p>
        <p>Cao (cm): {player.height}</p>
        <p>Nặng (kg): {player.weight}</p>
        <p>Vị trí: {player.position}</p>
        <p>Năm sinh: {new Date(player.birthDay).toLocaleDateString()}</p>
        <p>Số áo: {player.kit}</p>
        <p>Quốc tịch: {player.nationality}</p>
        <p>Đội: {player.clubName}</p>
      </div>
    </div>
  );

  const statistics = (
    <div className="statistics">
      <table className="statistics-table">
        <thead>
        <tr>
          {/* ... */}
        </tr>
        </thead>
        <tbody>
        <tr>
          {/* ... */}
        </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="player-container">
      <h1>{player.name}</h1>
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab('player')}
          className={activeTab === 'player' ? 'active' : ''}
        >
          Cầu thủ
        </button>
        <button
          onClick={() => setActiveTab('statistics')}
          className={activeTab === 'statistics' ? 'active' : ''}
        >
          Thống kê
        </button>
      </div>
      {activeTab === 'player' ? playerInfo : statistics}
    </div>
  );
};

export default Player;