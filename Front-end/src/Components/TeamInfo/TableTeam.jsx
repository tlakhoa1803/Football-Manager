import React, { useState, useEffect } from 'react';
import './Team.css';
import { Link ,useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSoccerBall, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

const DataTeam = () => {
  const [players, setPlayers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [team, setTeam] = useState(null);
  const [coach, setCoach] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedSeason = searchParams.get('season');

  useEffect(() => {
    const teamId = window.location.pathname.split('/').pop();

    // Fetch team data
    fetch(`http://localhost:8888/club-list/${selectedSeason}`)
      .then(response => response.json())
      .then(data => {
        const teamData = data.data.find(team => team.id === teamId);
        if (teamData) {
          setTeam(teamData);
          // Fetch players data
          fetch(`http://localhost:8888/player-profile/${teamId}`)
            .then(response => response.json())
            .then(data => {
              setPlayers(data.data);
            })
            .catch(error => console.error(`Error: ${error}`));
        }
      })
      .catch(error => console.error(`Error: ${error}`));
  },  [selectedSeason]);

  useEffect(() => {
    if (team) {
      fetch(`http://localhost:8888/club/coach/${team.id}`)
        .then(response => response.json())
        .then(data => {
          setCoach(data.data);
        })
        .catch(error => console.error(`Error: ${error}`));
    }
  }, [team]);

  const onSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedPlayers = [...players].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setPlayers(sortedPlayers);
    setSortConfig({ key, direction });
  };

  const getArrow = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return '↑';
      }
      if (sortConfig.direction === 'descending') {
        return '↓';
      }
    }
    return '';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  if (!team) {
    return <div>Không tìm thấy thông tin đội</div>;
  }

  return (
    <div>
      <div className="team-header-tab">
        <img src={team.logo} alt={team.clubName} className="team-logo-tab"/>
        <h1 className='clubnametab'>{team.clubName}</h1>
      </div>
      <div className='sta_coach'>
        <p style={{marginRight: "10px"}}>
          <FontAwesomeIcon icon={faSoccerBall}/>
          Sân Nhà: {'SVD ' + team.nameStadium}
        </p>
        <p className='coachtab' style={{marginRight: "10px"}}>
          <FontAwesomeIcon icon={faPeopleGroup}/>
          Huấn luyện viên: {coach ? coach.name : 'N/A'}
        </p>
      </div>
      <table>
        <thead>
        <tr>
          <th className='title_tab' onClick={() => onSort('name')}>Họ và Tên {getArrow('name')}
          </th>
          <th className='title_tab' onClick={() => onSort('kit')}>Số áo {getArrow('kit')}</th>
          <th className='title_tab' onClick={() => onSort('position')}>Vị trí {getArrow('position')}</th>
          <th className='title_tab' onClick={() => onSort('height')}>Cao (cm) {getArrow('height')}</th>
          <th className='title_tab' onClick={() => onSort('weight')}>Nặng (kg) {getArrow('weight')}</th>
          <th className='title_tab' onClick={() => onSort('birthDay')}>Năm sinh {getArrow('birthDay')}</th>
        </tr>
        </thead>
        <tbody>
        {players.map((player, index) => (
          <tr key={index}>
            <td className='title_tab'>
              <Link style={{textDecoration: 'none', color: 'black'}} to={`/player/${player.id}`}>{player.name}</Link>
            </td>
            <td className='title_tab'>{player.kit}</td>
            <td className='title_tab'>{player.position}</td>
            <td className='title_tab'>{player.height}</td>
            <td className='title_tab'>{player.weight}</td>
            <td className='title_tab'>{formatDate(player.birthDay)}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTeam;