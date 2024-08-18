import React, {useEffect, useState} from 'react';
import './RuleFormat.css';
import {useSelector} from "react-redux";

const RuleFormat = () => {

  const accessToken = useSelector((state) => state.user.accessToken); // Get the accessToken from the Redux store

  const [rules, setRules] = useState({
    maxAge: '',
    maxForeignPlayers: '',
    winPoints: '',
    drawPoints: '',
    losePoints: '',
    maxPlayer:'',
    minPlayer:'',
    minAge:'',
  });

  const [newValues, setNewValues] = useState({
    maxAge: '',
    maxForeignPlayers: '',
    winPoints: '',
    drawPoints: '',
    losePoints: '',
    maxPlayer:'',
    minPlayer:'',
    minAge:'',
  });

  const ruleKeyMap = {
    maxAge: 'age-max',
    minAge: 'age-min',
    maxForeignPlayers: 'foreign-player',
    winPoints: 'win-score',
    drawPoints: 'draw-score',
    losePoints: 'lose-score',
    maxPlayer:'max-player',
    minPlayer:'min-player',
  };
  useEffect(() => {
    fetch('http://localhost:8888/league-rule', {
      headers: {
        'Authorization': `Bearer ${accessToken}` // Use the accessToken from the Redux store
      },
    })
      .then(response => response.json())
      .then(data => {
        const newRules = {};
        data.data.forEach(item => {
          const key = Object.keys(ruleKeyMap).find(key => ruleKeyMap[key] === item.key);
          newRules[key] = item.value;
        });
        setRules(newRules);
      });
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewValues({
      ...newValues,
      [name]: value,
    });
  };

  const handleConfirm = (rule) => {
    const newValue = newValues[rule] !== '' ? newValues[rule] : rules[rule].toString();
    console.log(`Quy định mới cho ${rule}: ${newValue}`);

    const backendKey = ruleKeyMap[rule];

    fetch('http://localhost:8888/league-rule/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}` // Use the accessToken from the Redux store
      },
      body: JSON.stringify({
        key: backendKey,
        value: newValue,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setRules({
          ...rules,
          [rule]: newValue,
        });
        setNewValues({
          ...newValues,
          [rule]: '',
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="rule_container">
      <div className="rule-item">
        <label>Thay đổi tuổi tối đa của cầu thủ</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.maxAge}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="maxAge"
            value={newValues.maxAge}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('maxAge')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi tuổi tối thiểu của cầu thủ</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.minAge}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="minAge"
            value={newValues.minAge}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('minAge')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số cầu thủ nước ngoài tối đa</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.maxForeignPlayers}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="maxForeignPlayers"
            value={newValues.maxForeignPlayers}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('maxForeignPlayers')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số điểm trận thắng</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.winPoints}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="winPoints"
            value={newValues.winPoints}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('winPoints')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số điểm trận hòa</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.drawPoints}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="drawPoints"
            value={newValues.drawPoints}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('drawPoints')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số điểm trận thua</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.losePoints}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="losePoints"
            value={newValues.losePoints}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('losePoints')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số cầu thủ trong đội tối đa</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.maxPlayer}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="maxPlayer"
            value={newValues.maxPlayer}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('maxPlayer')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
      <div className="rule-item">
        <label>Thay đổi số cầu thủ trong đội tối thiểu</label>
        <div className="rule-row">
          <span>Quy định hiện hành: {rules.minPlayer}</span>
          <span className="arrow">→</span>
          <input
            type="text"
            placeholder="Nhập quy định mới"
            name="minPlayer"
            value={newValues.minPlayer}
            onChange={handleChange}
            className="p-2 flex-1 border border-gray-300 rounded"
          />
          <button onClick={() => handleConfirm('minPlayer')} className="confirm-btn">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default RuleFormat;