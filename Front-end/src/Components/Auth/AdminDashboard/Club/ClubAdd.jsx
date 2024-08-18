import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import './ClubAdd.css';

const ClubAdd = () => {
  const [formData, setFormData] = useState({
    nameClub: '',
    short_hand: '',
    season: '',
  });

  const accessToken = useSelector((state) => state.user.accessToken); // Get the accessToken from the Redux store

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async () => {
    if (formData.nameClub && formData.short_hand && formData.season) {
      const response = await fetch('http://localhost:8888/club', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` // Use the accessToken from the Redux store
        },
        body: JSON.stringify({
          name_club: formData.nameClub,
          short_hand: formData.short_hand,
          sea_son: formData.season,
          logo : formData.logo,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setFormData({
        nameClub: '',
        short_hand: '',
        season: '',
        logo:'',
      });
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="club-add">
      <div className="form-group">
        <label>Tên đội:</label>
        <input
          type="text"
          name="nameClub"
          placeholder="Nhập tên đội"
          value={formData.nameClub}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Tên viết tắt đội bóng:</label>
        <input
          type="text"
          name="short_hand"
          placeholder="Nhập tên viết tắt đội bóng"
          value={formData.short_hand}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>LogoLink:</label>
        <input
          type="text"
          name="logo"
          placeholder="Nhập logo đội bóng"
          value={formData.logo}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Chọn mùa giải:</label>
        <select name="season" value={formData.season} onChange={handleChange}>
          <option value="">Chọn mùa giải</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </div>
      <div className="buttons">
        <button onClick={submitForm}>Xác nhận</button>
      </div>
    </div>
  );
};

export default ClubAdd;