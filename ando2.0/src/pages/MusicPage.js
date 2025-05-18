// src/pages/MusicPage.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAccessToken } from '../api/spotify/token';
import { searchTracks, getRecommendations } from '../api/spotify/api';
import TrackCard from '../components/TrackCard';

const MusicPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const mood = params.get('mood');
  const genre = params.get('genre');
  const searchQuery = params.get('search');

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      const token = await getAccessToken();

      let result = [];
      if (searchQuery) {
        result = await searchTracks(searchQuery, token);
      } else if (mood && genre) {
        result = await getRecommendations(mood, genre, token);
      }

      setTracks(result);
      setLoading(false);
    };

    fetchTracks();
  }, [searchQuery, mood, genre]);

  return (
    <div className="music-page">
      <h2>{searchQuery ? `Search Results: "${searchQuery}"` : 'Recommended Tracks'}</h2>
      {loading ? <p>Loading...</p> : tracks.map((track) => <TrackCard key={track.id} track={track} />)}
    </div>
  );
};

export default MusicPage;
