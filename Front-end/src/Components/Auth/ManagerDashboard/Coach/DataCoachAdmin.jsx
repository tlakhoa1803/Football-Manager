import React, { useState, useEffect } from 'react';
import '../../../TeamInfo/Team.css';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSoccerBall, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from "react-redux";
import Modal from '../Player/Modal';

const DataCoachAdmin = () => {
  const [coaches, setCoaches] = useState([]);
  const [team, setTeam] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedSeason = searchParams.get('season');
  const accessToken = useSelector((state) => state.user.accessToken);
  const [clubId, setClubId] = useState(null);
  const [editingCoach, setEditingCoach] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await fetch(`http://localhost:8888/club-profile `, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
        });
        const profileData = await profileResponse.json();
        setClubId(profileData.data.clubId);
        setTeam(profileData.data);

        const coachesResponse = await fetch(`http://localhost:8888/club/coach/${profileData.data.clubId}`);
        const coachesData = await coachesResponse.json();
        setCoaches(coachesData.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, [selectedSeason, accessToken]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const handleEdit = (coachId) => {
    const coach = coaches.find(coach => coach.id === coachId);
    setEditingCoach(coach);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    // Make a PUT request to the server
    fetch(`http://localhost:8888/coach/update/${editingCoach.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Use the accessToken from the Redux store
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editingCoach)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Update the coach in the local state
        setCoaches(coaches.map(coach => coach.id === editingCoach.id ? editingCoach : coach));
        // Close the form
        setEditingCoach(null);
      })
      .catch(error => console.error(`Error: ${error}`));
  };

  const handleDelete = async (coachId) => {
    try {
      const response = await fetch(`http://localhost:8888/delete/coach/${coachId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setCoaches(coaches.filter(coach => coach.id !== coachId));
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  if (!team) {
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
      </div>
      <table>
        <thead>
        <tr>
          <th className='title_tab'>Họ và Tên</th>
          <th className='title_tab'>Vai trò</th>
          <th className='title_tab'>Câu lạc bộ</th>
          <th className='title_tab'>Năm sinh</th>
          <th className='title_tab'>Option</th>
        </tr>
        </thead>
        <tbody>
        {coaches.map((coach, index) => (
          <tr key={index}>
            <td className='title_tab'>
              <Link style={{textDecoration: 'none', color: 'black'}} to={`/coach/${coach.id}`}>{coach.name}</Link>
            </td>
            <td className='title_tab'>{coach.role}</td>
            <td className='title_tab'>{coach.clubName}</td>
            <td className='title_tab'>{formatDate(coach.birthday)}</td>
            <td className='title_tab'>
              <button style={{marginRight: '10px'}} onClick={() => handleEdit(coach.id)}>Edit</button>
              <button style={{marginLeft: '10px'}} onClick={() => handleDelete(coach.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Modal isOpen={!!editingCoach} onClose={() => setEditingCoach(null)}>
        {editingCoach && (
          <form onSubmit={handleEditSubmit}>
            <div className="modal-form-label">
              <label>
                Name:
                <input type="text" value={editingCoach.name} onChange={event => setEditingCoach({ ...editingCoach, name: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <label>
                Role:
                <input type="text" value={editingCoach.role} onChange={event => setEditingCoach({ ...editingCoach, role: event.target.value })} />
              </label>
            </div>
            <div className="modal-form-label">
              <label>
                Birthday:
                <input type="text" value={editingCoach.birthday} onChange={event => setEditingCoach({ ...editingCoach, birthday: event.target.value })} />
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

export default DataCoachAdmin;