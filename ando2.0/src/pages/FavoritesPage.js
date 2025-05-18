// src/pages/FavoritesPage.js
import React, { useEffect, useState } from 'react';
import TrackCard from '../components/TrackCard';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  return (
    <div className="favorites-page">
      <h2>Your Favorite Tracks</h2>
      {favorites.length === 0 ? <p>No favorites yet.</p> : favorites.map(track => <TrackCard key={track.id} track={track} />)}
    </div>
  );
};

export default FavoritesPage;
