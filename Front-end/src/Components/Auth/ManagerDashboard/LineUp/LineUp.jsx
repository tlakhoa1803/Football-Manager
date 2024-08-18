import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './LineUp.css'; // Import a CSS file to style your components
import html2canvas from 'html2canvas';
const Lineup = () => {
  const [players, setPlayers] = useState([]);
  const [lineup, setLineup] = useState([]);
  const accessToken = useSelector((state) => state.user.accessToken);
  {lineup.map((player, index) => player && (
    <div key={index} className="player" style={{ left: player.x, top: player.y }}>
      {player.name}
    </div>
  ))}
  const [ setSavedLineups] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const player = e.dataTransfer.getData('text');

    // Check if player is already in the lineup
    if (lineup.some(p => p.name === player)) {
      alert('This player is already on the field.');
      return;
    }

    // Check if lineup already has 11 players
    if (lineup.length >= 11) {
      alert('There are already 11 players on the field.');
      return;
    }

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;  //y position within the element.
    const newLineup = [...lineup, { name: player, x, y }];
    setLineup(newLineup);
  };

  useEffect(() => {
    fetch('http://localhost:8888/club/player-all', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          setPlayers(data.data.map(player => player.name));
        } else {
          console.error('Players response is not an array:', data);
          setPlayers([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching players:', error);
        setPlayers([]); // Ensure players is an array even if the fetch fails
      });
  }, [accessToken]);

  // const handleDrop = (index, player) => {
  //   const newLineup = [...lineup];
  //   newLineup[index] = player;
  //   setLineup(newLineup);
  // };

  const handleSubmit = async () => {
  try {
    const field = document.querySelector('.football-field');
    const canvas = await html2canvas(field);
    const img = canvas.toDataURL();

    const response = await fetch('http://localhost:8888/lineup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        lineup,
        img,
        filename: 'your_desired_filename.png' // Replace this with your desired filename
      }),
    });

    setSavedLineups(prevLineups => [...prevLineups, img]);
    if (response.ok) {
      alert('Lineup saved successfully!');
    } else {
      alert(`Error saving lineup: ${response.statusText}`);
    }
  } catch (error) {
    alert(`Error saving lineup: ${error.message}`);
  }
};
  return (
    <div className="lineup-container mx-auto p-4">
      <div className="flex">
        <div className="w-1/4 p-4 border">
          {players.length > 0 ? (
            players.map((player, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text', player)}
                className="border p-2 m-2 bg-gray-200 cursor-pointer"
              >
                {player}
              </div>
            ))
          ) : (
            <div>No players available</div>
          )}
        </div>

       <div className="w-3/4 p-4">
      <div
        className="football-field resized-image"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/c/c9/Boisko.svg')`,
          backgroundSize: 'contain', // Change this from 'cover' to 'contain'
          height: '100%',
          backgroundRepeat: 'no-repeat'
        }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {lineup.map((player, index) => player && (
          <div
            key={index}
            className="player"
            style={{left: player.x, top: player.y}}
          >
            {player.name}
          </div>
        ))}
      </div>


          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 mt-4"
          >
            Save Lineup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lineup;