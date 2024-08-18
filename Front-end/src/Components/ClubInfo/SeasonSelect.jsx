import React from 'react';
import PropTypes from 'prop-types';

const SeasonSelector = ({ selectedSeason, onSeasonChange }) => {
  const seasons = ["2023-2024", "2022-2023"];
  return (
    <div className="season-selector-container">
      <select value={selectedSeason} onChange={(e) => onSeasonChange(e.target.value)}>
        {seasons.map((season, index) => (
          <option key={index} value={season}>
            {season}
          </option>
        ))}
      </select>
    </div>
  );
};

SeasonSelector.propTypes = {
  selectedSeason: PropTypes.string.isRequired,
  onSeasonChange: PropTypes.func.isRequired,
};

export default SeasonSelector;
