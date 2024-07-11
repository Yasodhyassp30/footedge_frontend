import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../report.css';

interface Player {
  id: string;
  name: string;
}

interface PlayerFilterProps {
  onApplyFilter: (ids: string[]) => void;
}

const PlayerFilter: React.FC<PlayerFilterProps> = ({ onApplyFilter }) => {
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [removedPlayers, setRemovedPlayers] = useState<string[]>([]);
  const [team1Players, setTeam1Players] = useState<Player[]>([]);
  const [team2Players, setTeam2Players] = useState<Player[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/player_ids')
      .then(response => {
        const uniquePlayers = Array.from(new Set(response.data.player_ids.map((player: Player) => player.id)))
          .map(id => response.data.player_ids.find((player: Player) => player.id === id));
        setAllPlayers(uniquePlayers);
        setFilteredPlayers(uniquePlayers);
        setTeam1Players(uniquePlayers.filter(player => player.id.startsWith('1')));
        setTeam2Players(uniquePlayers.filter(player => player.id.startsWith('2')));
      })
      .catch(error => {
        console.error("Error fetching player ids", error);
      });
  }, []);

  const handleSwitchChange = (playerId: string) => {
    setRemovedPlayers(prev => 
      prev.includes(playerId) ? prev.filter(id => id !== playerId) : [...prev, playerId]
    );
  };

  useEffect(() => {
    onApplyFilter(removedPlayers);
  }, [removedPlayers, onApplyFilter]);

  return (
    <div className="filter-container">
      {showFilter && (
        <>
          <h2>Filter Out Fake Detections</h2>
          <h3>Team 1</h3>
          <div className="player-scroll">
            {team1Players.map(player => (
              <div key={player.id} className="player-item">
                <span>{player.name || `Player ${player.id}`}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!removedPlayers.includes(player.id)}
                    onChange={() => handleSwitchChange(player.id)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
          <h3>Team 2</h3>
          <div className="player-scroll">
            {team2Players.map(player => (
              <div key={player.id} className="player-item">
                <span>{player.name || `Player ${player.id}`}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!removedPlayers.includes(player.id)}
                    onChange={() => handleSwitchChange(player.id)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>
          <div className="status-bar">
            <div className="fake">Fake Detection</div>
            <div className="real">Real Detection</div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerFilter;
