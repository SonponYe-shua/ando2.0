// src/components/TrackCard.js
import React, { useState } from 'react';

const TrackCard = ({ track }) => {
  const [isFavorited, setIsFavorited] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    return favs.some((fav) => fav.id === track.id);
  });

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorited) {
      favs = favs.filter((t) => t.id !== track.id);
    } else {
      favs.push(track);
    }

    localStorage.setItem('favorites', JSON.stringify(favs));
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="track-card">
      <img src={track.album.images[0]?.url} alt={track.name} />
      <div>
        <h4>{track.name}</h4>
        <p>{track.artists.map((a) => a.name).join(', ')}</p>
        {track.preview_url ? (
          <audio controls src={track.preview_url} />
        ) : (
          <p>No preview available</p>
        )}
        <button onClick={toggleFavorite}>
          {isFavorited ? '💖 Remove' : '🤍 Favorite'}
        </button>
      </div>
    </div>
  );
};

export default TrackCard;
