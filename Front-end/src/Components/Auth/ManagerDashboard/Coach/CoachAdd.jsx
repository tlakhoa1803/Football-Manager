import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './CoachAdd.css';

const CoachAdd = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    country: '',
    role: '',
  });

  const [entries, setEntries] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [error, setError] = useState('');

  const accessToken = useSelector((state) => state.user.accessToken);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = async () => {
    const trimmedFormData = {};
    for (const key in formData) {
      trimmedFormData[key] = formData[key].trim();
    }

    if (Object.values(trimmedFormData).every(value => value !== '')) {
      const response = await fetch('http://localhost:8888/coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name: trimmedFormData.name,
          country: trimmedFormData.country,
          role: trimmedFormData.role,
          birthday: trimmedFormData.birthday,
        })
      });

      if (response.ok) {
        alert('Huấn luyện viên đã được thêm thành công!');
        setEntries([...entries, { ...trimmedFormData, id: Date.now() }]);
        setFormData({
          name: '',
          birthday: '',
          country: '',
          role: '',
        });
        setError('');
      } else {
        alert('Error adding coach');
      }
    } else {
      alert("Vui lòng điền đầy đủ thông tin huấn luyện viên.");
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
    <div className="coach-add">
      <div className="form-group">
        <label>Tên Huấn luyện viên:</label>
        <input
          type="text"
          name="name"
          placeholder="Nhập tên huấn luyện viên"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Ngày sinh:</label>
        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Quốc tịch:</label>
        <input
          type="text"
          name="country"
          placeholder="Nhập quốc tịch"
          value={formData.country}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Vai trò:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="Head Coach">Huấn luyện viên trưởng</option>
          <option value="Assistant coach">Trợ lý huấn luyện viên</option>
          <option value="Fitness coach">Huấn luyện viên thể lực</option>
          <option value="Nutrition Coach">Chuyên gia dinh dưỡng</option>
        </select>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="buttons">
        <button onClick={handleConfirm}>Xác nhận</button>
      </div>

      {entries.length > 0 && (
        <table className="entries-table">
          <thead>
          <tr>
            <th>Tên Huấn luyện viên</th>
            <th>Ngày sinh</th>
            <th>Quốc tịch</th>
            <th>Vai trò</th>
            <th>Option</th>
          </tr>
          </thead>
          <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>
                {isEditing === entry.id ? (
                  <input
                    type="text"
                    name="name"
                    value={entry.name}
                    onChange={(e) => handleEntryChange(e, entry.id)}
                  />
                ) : (
                  entry.name
                )}
              </td>
              <td>
                {isEditing === entry.id ? (
                  <input
                    type="date"
                    name="birthday"
                    value={entry.birthday}
                    onChange={(e) => handleEntryChange(e, entry.id)}
                  />
                ) : (
                  entry.birthday
                )}
              </td>
              <td>
                {isEditing === entry.id ? (
                  <input
                    type="text"
                    name="country"
                    value={entry.country}
                    onChange={(e) => handleEntryChange(e, entry.id)}
                  />
                ) : (
                  entry.country
                )}
              </td>
              <td>
                {isEditing === entry.id ? (
                  <select
                    name="role"
                    value={entry.role}
                    onChange={(e) => handleEntryChange(e, entry.id)}
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="huấn luyện viên trưởng">Huấn luyện viên trưởng</option>
                    <option value="trợ lý huấn luyện viên">Trợ lý huấn luyện viên</option>
                    <option value="huấn luyện viên thể lực">Huấn luyện viên thể lực</option>
                    <option value="chuyên gia dinh dưỡng">Chuyên gia dinh dưỡng</option>
                  </select>
                ) : (
                  entry.role
                )}
              </td>
              <td>
                {isEditing === entry.id ? (
                  <>
                    <button className="save-button" onClick={() => handleSave(entry.id)}>Lưu</button>
                    <button className="cancel-button" onClick={() => setIsEditing(null)}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button style={{marginRight : '20px'}} className="edit-button" onClick={() => handleEdit(entry.id)}>Sửa</button>
                    <button className="delete-button" onClick={() => handleDelete(entry.id)}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoachAdd;