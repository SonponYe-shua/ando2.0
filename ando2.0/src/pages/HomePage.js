// src/pages/HomePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moods from '../constants/moods';
import genres from '../constants/genres';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const navigate = useNavigate();

  const handleExplore = () => {
    if (selectedMood && selectedGenre) {
      navigate(`/music?mood=${selectedMood}&genre=${selectedGenre}`);
    }
  };

  const handleSearch = (query) => {
    navigate(`/music?search=${query}`);
  };

  return (
    <div className="home-page">
      <h2>Discover music by mood or genre</h2>
      <SearchBar onSearch={handleSearch} />

      <h3>Select a Mood</h3>
      <div className="mood-grid">
        {moods.map((mood) => (
          <div
            key={mood.name}
            className={`mood-card ${selectedMood === mood.name ? 'selected' : ''}`}
            onClick={() => setSelectedMood(mood.name)}
            style={{ backgroundImage: `url(${mood.image})` }}
          >
            <span>{mood.name}</span>
          </div>
        ))}
      </div>

      <h3>Select a Genre</h3>
      <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
        <option value="">-- Select Genre --</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>

      <button onClick={handleExplore} disabled={!selectedMood || !selectedGenre}>
        Explore
      </button>
    </div>
  );
};

export default HomePage;
