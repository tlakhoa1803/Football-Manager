import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './PlayerStats.css';
import axios from 'axios';

const PlayerStats = ({ match }) => {
  const [goalTypes, setGoalTypes] = useState({});
  const [cardTypes, setCardTypes] = useState({});

  useEffect(() => {
    // Gọi API để lấy danh sách loại bàn thắng
    axios.get('http://localhost:8888/match_event/goal_type')
      .then(response => {
        const goalTypesData = response.data.data.reduce((acc, type) => {
          acc[type.goalTypeId] = type.goalTypeName;
          return acc;
        }, {});
        setGoalTypes(goalTypesData);
      })
      .catch(error => {
        console.error('Error fetching goal types:', error);
      });

    // Gọi API để lấy danh sách loại thẻ
    axios.get('http://localhost:8888/match_event/card_type')
      .then(response => {
        const cardTypesData = response.data.data.reduce((acc, type) => {
          acc[type.cardTypeId] = type.cardTypeName;
          return acc;
        }, {});
        setCardTypes(cardTypesData);
      })
      .catch(error => {
        console.error('Error fetching card types:', error);
      });
  }, []);

  if (!match) return null;
  return (
    <div className="player-stats">
      <div className="team-stats">
        <div className="team-name1">{match.homeTeam.name}</div>
        <ul>
          {match.homeTeam.players.map((player, index) => (
            <li key={index}>
              <div className="player-name">{player.playerNameGoal || player.playerNameCard}</div>
              {player.goalType && (
                <>
                  <div className="goal-time1">{player.timeInMatchGoal}&apos;</div>
                  <div className="goal-type1">{goalTypes[player.goalType]}</div>
                </>
              )}
              {player.cardType && (
                <>
                  <div className="card-time1">{player.timeInMatchCard}&apos;</div>
                  <div className="card-type1">{cardTypes[player.cardType]}</div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="team-stats">
        <div className="team-name2">{match.awayTeam.name}</div>
        <ul>
          {match.awayTeam.players.map((player, index) => (
            <li key={index}>
              <div className="player-name">{player.playerNameGoal || player.playerNameCard}</div>
              {player.goalType && (
                <>
                  <div className="goal-time2">{player.timeInMatchGoal}&apos;</div>
                  <div className="goal-type2">{goalTypes[player.goalType]}</div>
                </>
              )}
              {player.cardType && (
                <>
                  <div className="card-time2">{player.timeInMatchCard}&apos;</div>
                  <div className="card-type2">{cardTypes[player.cardType]}</div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

PlayerStats.propTypes = {
  match: PropTypes.shape({
    homeTeam: PropTypes.shape({
      name: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(
        PropTypes.shape({
          playerNameGoal: PropTypes.string,
          timeInMatchGoal: PropTypes.string,
          goalType: PropTypes.string, // Change PropTypes to string instead of oneOf
          playerNameCard: PropTypes.string,
          timeInMatchCard: PropTypes.string,
          cardType: PropTypes.string, // Change PropTypes to string instead of oneOf
        })
      ).isRequired
    }).isRequired,
    awayTeam: PropTypes.shape({
      name: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(
        PropTypes.shape({
          playerNameGoal: PropTypes.string,
          timeInMatchGoal: PropTypes.string,
          goalType: PropTypes.string, // Change PropTypes to string instead of oneOf
          playerNameCard: PropTypes.string,
          timeInMatchCard: PropTypes.string,
          cardType: PropTypes.string, // Change PropTypes to string instead of oneOf
        })
      ).isRequired
    }).isRequired
  }).isRequired
};

export default PlayerStats;