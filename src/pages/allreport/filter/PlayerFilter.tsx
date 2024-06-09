
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
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
  const [removedPlayers, setRemovedPlayers] = useState<Player[]>([]);
  const [searchTermDetected, setSearchTermDetected] = useState<string>('');
  const [searchTermRemoved, setSearchTermRemoved] = useState<string>('');
  const [showFilter, setShowFilter] = useState<boolean>(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/reports/player_ids')
      .then(response => {
        const uniquePlayers = Array.from(new Set(response.data.player_ids.map((player: Player) => player.id)))
          .map(id => response.data.player_ids.find((player: Player) => player.id === id));
        setAllPlayers(uniquePlayers);
        setFilteredPlayers(uniquePlayers);
      })
      .catch(error => {
        console.error("Error fetching player ids", error);
      });
  }, []);

  const handleRemove = (id: string) => {
    const player = filteredPlayers.find(p => p.id === id);
    if (player) {
      setRemovedPlayers(prev => [...prev, player]);
      setFilteredPlayers(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleRestore = (id: string) => {
    const player = removedPlayers.find(p => p.id === id);
    if (player) {
      setFilteredPlayers(prev => [...prev, player]);
      setRemovedPlayers(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSearchDetected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTermDetected(value);
    if (value) {
      setFilteredPlayers(allPlayers.filter(p => p.name.toLowerCase().includes(value) || p.id.includes(value)));
    } else {
      setFilteredPlayers(allPlayers);
    }
  };

  const handleSearchRemoved = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTermRemoved(value);
    if (value) {
      setRemovedPlayers(prev => prev.filter(p => p.name.toLowerCase().includes(value) || p.id.includes(value)));
    } else {
      setRemovedPlayers(allPlayers.filter(p => !filteredPlayers.some(fp => fp.id === p.id)));
    }
  };

  const applyFilter = () => {
    onApplyFilter(removedPlayers.map(p => p.id));
    setShowFilter(false);
  };

  return (
    <div>
      {showFilter ? (
        <div className="filter-container">
          <h2>Filter Out Fake Detections</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search player ID or name."
              value={searchTermDetected}
              onChange={handleSearchDetected}
            />
          </div>
          <h3>Players ID Detected</h3>
          <div className="player-scroll">
            {filteredPlayers.map(player => (
              <div key={player.id} className="player-item">
                <span>{player.name || `Player ${player.id}`}</span>
                <button className="remove-button" onClick={() => handleRemove(player.id)}>−</button>
              </div>
            ))}
          </div>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search removed player ID or name."
              value={searchTermRemoved}
              onChange={handleSearchRemoved}
            />
          </div>
          <h3>Removed IDs</h3>
          <div className="player-scroll">
            {removedPlayers.map(player => (
              <div key={player.id} className="player-item">
                <span>{player.name || `Player ${player.id}`}</span>
                <button className="restore-button" onClick={() => handleRestore(player.id)}>+</button>
              </div>
            ))}
          </div>
          <button className="apply-button" onClick={applyFilter}>Apply to All</button>
        </div>
      ) : (
        <div className="toggle-filter" onClick={() => setShowFilter(true)}>
          <FaChevronDown /> Show Filter
        </div>
      )}
    </div>
  );
};

export default PlayerFilter;
