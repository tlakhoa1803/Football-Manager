import React, { useState, useEffect } from 'react';
import '../../../TeamInfo/Team.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSoccerBall, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import Modal from './Modal';

const DataTeamAdmin = () => {
  const [players, setPlayers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [team, setTeam] = useState(null);
  const [coach, setCoach] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedSeason = searchParams.get('season');
  const accessToken = useSelector((state) => state.user.accessToken);
  const [clubId, setClubId] = useState(null);
  const [editingPlayer, setEditingPlayer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await fetch(`http://localhost:8888/club-profile`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
        });
        const profileData = await profileResponse.json();
        setClubId(profileData.data.clubId);
        setTeam(profileData.data);

        const playersResponse = await fetch(`http://localhost:8888/player-profile/${profileData.data.clubId}`);
        const playersData = await playersResponse.json();
        setPlayers(playersData.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, [selectedSeason, accessToken]);

  useEffect(() => {
    const fetchCoach = async () => {
      if (team && clubId) {
        try {
          const coachResponse = await fetch(`http://localhost:8888/club/coach/${clubId}`);
          const coachData = await coachResponse.json();
          setCoach(coachData.data);
        } catch (error) {
          console.error(`Error: ${error}`);
        }
      }
    };

    fetchCoach();
  }, [team, clubId]);

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

  const handleEdit = (playerId) => {
    const player = players.find(player => player.id === playerId);
    setEditingPlayer(player);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    // Make a PUT request to the server
    fetch(`http://localhost:8888/player/update/${editingPlayer.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Use the accessToken from the Redux store
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingPlayer)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Update the player in the local state
        setPlayers(players.map(player => player.id === editingPlayer.id ? editingPlayer : player));
        // Close the form
        setEditingPlayer(null);
      })
      .catch(error => console.error(`Error: ${error}`));
  };

  const handleDelete = async (playerId) => {
    try {
      const response = await fetch(`http://localhost:8888/delete/player/${playerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setPlayers(players.filter(player => player.id !== playerId));
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  if (!team || !coach) {
    return <div>Không tìm thấy thông tin đội</div>;
  }

  return (
    <div>
      <div className="team-header-tab">
        <img src={team.logo} alt={team.clubName} className="team-logo-tab" />
        <h1 className='clubnametab'>{team.clubName}</h1>
      </div>
      <div className='sta_coach'>
        <p>
          <FontAwesomeIcon icon={faSoccerBall} />
          Sân Nhà: {'SVD ' + team.nameStadium}
        </p>
        <p className='coachtab'>
          <FontAwesomeIcon icon={faPeopleGroup} />
          Huấn luyện viên: {coach.name}
        </p>
      </div>
      <table>
        <thead>
        <tr>
          <th className='title_tab' onClick={() => onSort('name')}>Họ và Tên {getArrow('name')}</th>
          <th className='title_tab' onClick={() => onSort('kit')}>Số áo {getArrow('kit')}</th>
          <th className='title_tab' onClick={() => onSort('position')}>Vị trí {getArrow('position')}</th>
          <th className='title_tab' onClick={() => onSort('height')}>Cao (cm) {getArrow('height')}</th>
          <th className='title_tab' onClick={() => onSort('weight')}>Nặng (kg) {getArrow('weight')}</th>
          <th className='title_tab' onClick={() => onSort('birthDay')}>Năm sinh {getArrow('birthDay')}</th>
          <th className='title_tab'>Option</th>
        </tr>
        </thead>
        <tbody>
        {players.map((player, index) => (
          <tr key={index}>
            <td className='title_tab'>
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/player/${player.id}`}>{player.name}</Link>
            </td>
            <td className='title_tab'>{player.kit}</td>
            <td className='title_tab'>{player.position}</td>
            <td className='title_tab'>{player.height}</td>
            <td className='title_tab'>{player.weight}</td>
            <td className='title_tab'>{formatDate(player.birthDay)}</td>
            <td className='title_tab'>
              <button style={{ marginRight: '10px' }} onClick={() => handleEdit(player.id)}>Edit</button>
              <button style={{ marginLeft: '10px' }} onClick={() => handleDelete(player.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Modal isOpen={!!editingPlayer} onClose={() => setEditingPlayer(null)}>
        {editingPlayer && (
          <form onSubmit={handleEditSubmit}>
            <div className="modal-form-label">
              <label>
                Name:
                <input type="text" value={editingPlayer.name} onChange={event => setEditingPlayer({ ...editingPlayer, name: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <label>
                Kit:
                <input type="text" value={editingPlayer.kit} onChange={event => setEditingPlayer({ ...editingPlayer, kit: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <label>
                Weight:
                <input type="text" value={editingPlayer.weight} onChange={event => setEditingPlayer({ ...editingPlayer, weight: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <label>
                Position:
                <input type="text" value={editingPlayer.position} onChange={event => setEditingPlayer({ ...editingPlayer, position: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <label>
                Height:
                <input type="text" value={editingPlayer.height} onChange={event => setEditingPlayer({ ...editingPlayer, height: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <label>
                Birthday:
                <input type="text" value={editingPlayer.birthday} onChange={event => setEditingPlayer({ ...editingPlayer, birthday: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <label>
                Achievement:
                <input type="text" value={editingPlayer.achievement} onChange={event => setEditingPlayer({ ...editingPlayer, achievement: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <label>
                Status:
                <input type="text" value={editingPlayer.status} onChange={event => setEditingPlayer({ ...editingPlayer, status: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DataTeamAdmin;