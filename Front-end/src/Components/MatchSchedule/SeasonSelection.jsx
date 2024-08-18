import React from 'react';
import PropTypes from 'prop-types';

const SeasonSelection = ({ seasons, selectedSeason, onSeasonChange }) => (
  <div className="season-selection">
    <label htmlFor="season-select">Chọn mùa giải: </label>
    <select
      id="season-select"
      value={selectedSeason}
      onChange={(e) => onSeasonChange(e.target.value)}
    >
      {seasons.map((season, index) => (
        <option key={index} value={season}>{season}</option>
      ))}
    </select>
  </div>
);

SeasonSelection.propTypes = {
  seasons: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedSeason: PropTypes.string.isRequired,
  onSeasonChange: PropTypes.func.isRequired,
};

export default SeasonSelection;