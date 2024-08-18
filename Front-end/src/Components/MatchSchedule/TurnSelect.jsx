import React from 'react';
import PropTypes from 'prop-types';

const TurnSelection = ({ turns, selectedTurn, onTurnChange }) => (
  <div className="turn-selection">
    {turns.map((matchRound, index) => (
      <button
        key={index}
        className={`turn-button ${selectedTurn === matchRound ? 'selected' : ''}`}
        onClick={() => onTurnChange(matchRound)}
      >
        Turn {matchRound}
      </button>
    ))}
    <button
      className={`turn-button ${selectedTurn === 'all' ? 'selected' : ''}`}
      onClick={() => onTurnChange('all')}
    >
      Tất cả
    </button>
  </div>
);

TurnSelection.propTypes = {
  turns: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTurn: PropTypes.string.isRequired,
  onTurnChange: PropTypes.func.isRequired,
};

export default TurnSelection;