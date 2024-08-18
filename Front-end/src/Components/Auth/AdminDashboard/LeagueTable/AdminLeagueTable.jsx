import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataTable from '../../../Ranking/DataTable';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

const AdminLeagueTable = () => {
  const [selectedSeason, setSelectedSeason] = useState('2023-2024');
  const [data, setData] = useState([]);
  const accessToken = useSelector((state) => state.user.accessToken);
  useEffect(() => {
    fetch(`http://localhost:8888/summary/${selectedSeason}`)
      .then(response => response.json())
      .then(data => setData(data.data))
      .catch(error => console.error(`Error: ${error}`));
  }, [selectedSeason]);

  const seasonTitles = {
    '2023-2024': 'Vô địch Quốc gia Night Wolf 2023/24',
    '2022-2023': 'Vô địch Quốc gia Night Wolf 2022/23',
  };

  const sortedData = data
    .slice()
    .sort((a, b) => {
      if (b.points === a.points) {
        return b.goal_difference - a.goal_difference;
      }
      return b.points - a.points;
    })
    .map((team, index) => ({ ...team, stt: index + 1 }));

  const columns = [
    {
      Header: 'Pos',
      accessor: 'stt',
    },
    {
      Header: 'Team',
      accessor: 'clubName',
      Cell: ({ cell: { value }, row: { original } }) => (
        <Link to={`/team/${original.clubId}?season=${selectedSeason}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={original.logoLink} alt={value} style={{ height: '30px', marginRight: '10px' }} />
            {value}
          </div>
        </Link>
      ),
    },
    {
      Header: 'Played',
      accessor: 'matchPlayed',
    },
    {
      Header: 'Won',
      accessor: 'matchWon',
    },
    {
      Header: 'Drawn',
      accessor: 'matchDraw',
    },
    {
      Header: 'Lost',
      accessor: 'matchLost',
    },
    {
      Header: 'GF',
      accessor: 'goalScored',
    },
    {
      Header: 'GA',
      accessor: 'goalConceded',
    },
    {
      Header: 'GD',
      accessor: 'goalDifference',
    },
    {
      Header: 'Yellow Card',
      accessor: 'yellowCard',
    },
    {
      Header: 'Red Card',
      accessor: 'redCard',
    },
    {
      Header: 'Points',
      accessor: 'points',
    },
  ];
  const fetchLeagueSummary = () => {
    fetch(`http://localhost:8888/summary/${selectedSeason}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(data.data);
      })
      .catch(error => console.error(`Error: ${error}`));
  };

  return (
    <div className="league-table">
      <h1 className="TitleRank">{seasonTitles[selectedSeason]}</h1>
      <div className="season-selector">
        <label htmlFor="season">Mùa giải: </label>
        <select
          id="season"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
        >
          <option value="2023">2023-2024</option>
          <option value="2022">2022-2023</option>
        </select>
      </div>
      <DataTable columns={columns} data={sortedData}/>
      <div style={{textAlign:'right', paddingTop:'20px'}}>
        <button onClick={fetchLeagueSummary}>Update League Table</button>
      </div>
    </div>
  );
};

AdminLeagueTable.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.string,
  }),
  row: PropTypes.shape({
    original: PropTypes.shape({
      image: PropTypes.string,
    }),
  }),
};

export default AdminLeagueTable;