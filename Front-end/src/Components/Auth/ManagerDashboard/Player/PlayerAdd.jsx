import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import './PlayerAdd.css';

const PlayerAdd = () => {
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    position: '',
    nationality: '',
    type_player: '',
    kit: '',
    name: '',
    birth_day: '',
    status: ''
  });

  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState('');
  const [ageLimit, setAgeLimit] = useState(null);
  const [foreignPlayerCount, setForeignPlayerCount] = useState(null);
  const [foreignLimit, setForeignLimit] = useState(null); // Add this line
  const [PlayerCount, setPlayerCount] = useState(null);
  const [playerLimit, setplayerLimit] = useState(null);

  const accessToken = useSelector((state) => state.user.accessToken); // Get the accessToken from the Redux store
  useEffect(() => {
    fetch('http://localhost:8888/league-rule', {
      headers: {
        'Authorization': `Bearer ${accessToken}` // Use the accessToken from the Redux store
      },
    })
      .then(response => response.json())
      .then(data => {
        const ageLimitRule = data.data.find(item => item.key === 'age-limit');
        if (ageLimitRule) {
          setAgeLimit(parseInt(ageLimitRule.value));
        }
      });
  }, [accessToken]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };
  useEffect(() => {
    fetch('http://localhost:8888/club/player-all', {
      headers: {
        'Authorization': `Bearer ${accessToken}` // Use the accessToken from the Redux store
      },
    })
      .then(response => response.json())
      .then(data => {
        setForeignPlayerCount(parseInt(data.foreignPlayer));
      });
  }, [accessToken]);
  useEffect(() => {
    fetch('http://localhost:8888/club/player-all', {
      headers: {
        'Authorization': `Bearer ${accessToken}` // Use the accessToken from the Redux store
      },
    })
      .then(response => response.json())
      .then(data => {
        setPlayerCount(parseInt(data.player));
      });
  }, [accessToken]);

  useEffect(() => {
    fetch('http://localhost:8888/league-rule', {
      headers: {
        'Authorization': `Bearer ${accessToken}` // Use the accessToken from the Redux store
      },
    })
      .then(response => response.json())
      .then(data => {
        const foreignLimitRule = data.data.find(item => item.key === 'foreign-player');
        if (foreignLimitRule) {
          setForeignLimit(parseInt(foreignLimitRule.value));
        }
      });
  }, [accessToken]);
  useEffect(() => {
    fetch('http://localhost:8888/league-rule', {
      headers: {
        'Authorization': `Bearer ${accessToken}` // Use the accessToken from the Redux store
      },
    })
      .then(response => response.json())
      .then(data => {
        const playerLimitRule = data.data.find(item => item.key === 'max-player');
        if (playerLimitRule) {
          setplayerLimit(parseInt(playerLimitRule.value));
        }
      });
  }, [accessToken]);
  const handleConfirm = () => {
    const age = calculateAge(formData.birth_day);
    if (age < ageLimit) {
      setError(`Độ tuổi giới hạn là ${ageLimit} tuổi.`);
      return;
    }
    if (formData.type_player === 'Naturalization Player' && foreignPlayerCount >= foreignLimit) {
      setError(`Số lượng cầu thủ nước ngoài tối đa là ${foreignLimit}.`);
      alert(`There are already ${foreignPlayerCount} foreign players in your club.`);
      return;
    }
    if (PlayerCount >= playerLimit) {
      setError(`Số lượng cầu thủ tối đa là ${playerLimit}.`);
      alert(`There are already ${PlayerCount} players in your club.`);
      return;
    }

    const requiredFields = ['height', 'weight', 'position', 'nationality', 'kit', 'type_player', 'name', 'birth_day', 'status'];

    if (requiredFields.every(field => formData[field])) {
      // Add fetch POST API call here
      fetch('http://localhost:8888/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` // Use the accessToken from the Redux store
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setEntries([...entries, { ...formData, id: Date.now() }]);
          setFormData({
            height: '',
            weight: '',
            position: '',
            nationality: '',
            kit: '',
            type_player: '',
            name: '',
            birth_day: '',
            status: ''
          });
          setError('');
        })
        .catch(error => {
          console.error('Error:', error);
        });
      alert("Player added successfully")
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleEdit = (id) => {
    setIsEditing(id);
  };

  const handleSave = (id) => {
    setIsEditing(null);
    const updatedEntry = entries.find(entry => entry.id === id);
    console.log(updatedEntry);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleEntryChange = (e, id) => {
    const { name, value } = e.target;
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, [name]: value } : entry
    );
    setEntries(updatedEntries);
  };

  return (
    <div className="player-add">
      <div className="form-group">
        <label>Loại cầu thủ:</label>
        <select
          name="type_player"
          value={formData.type_player}
          onChange={handleChange}
        >
          <option value="National Player">Cầu thủ trong nước</option>
          <option value="Naturalization Player">Cầu thủ nước ngoài</option>
        </select>
      </div>
      <div className="form-group">
        <label>Chiều cao (cm):</label>
        <input
          type="number"
          name="height"
          placeholder="Nhập chiều cao"
          value={formData.height}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Cân nặng (kg):</label>
        <input
          type="number"
          name="weight"
          placeholder="Nhập cân nặng"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Vị trí:</label>
        <input
          type="text"
          name="position"
          placeholder="Nhập vị trí"
          value={formData.position}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Quốc tịch:</label>
        <input
          type="text"
          name="nationality"
          placeholder="Nhập quốc tịch"
          value={formData.nationality}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Số áo:</label>
        <input
          type="number"
          name="kit"
          placeholder="Nhập số áo"
          value={formData.kit}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Tên cầu thủ:</label>
        <input
          type="text"
          name="name"
          placeholder="Nhập tên cầu thủ"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Ngày sinh:</label>
        <input
          type="date"
          name="birth_day"
          value={formData.birth_day}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Trạng thái:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Đang thi đấu">Đang thi đấu</option>
          <option value="Chấn thương">Chấn thương</option>
          <option value="Đã giải nghệ">Đã giải nghệ</option>
        </select>
      </div>
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleConfirm}>Xác nhận</button>

      <div className="entry-list">
        <h3>Danh sách cầu thủ:</h3>
        {entries.map((entry) => (
          <div key={entry.id} className="entry-item">
            {isEditing === entry.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={entry.name}
                  onChange={(e) => handleEntryChange(e, entry.id)}
                />
                <input
                  type="date"
                  name="birth_day"
                  value={entry.birth_day}
                  onChange={(e) => handleEntryChange(e, entry.id)}
                />
                {/* Thêm các trường nhập khác nếu cần */}
                <button onClick={() => handleSave(entry.id)}>Lưu</button>
              </div>
            ) : (
              <div>
                <span>Tên: {entry.name}</span>
                <span>Ngày sinh: {entry.birth_day}</span>
                {/* Hiển thị các thông tin khác nếu cần */}
                <button onClick={() => handleEdit(entry.id)}>Chỉnh sửa</button>
                <button onClick={() => handleDelete(entry.id)}>Xóa</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerAdd;