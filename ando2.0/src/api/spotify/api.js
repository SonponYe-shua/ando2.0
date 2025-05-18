// src/api/spotify/api.js

import { getAccessToken, clearTokens } from './token';

const BASE_URL = 'https://api.spotify.com/v1';

async function callSpotify(endpoint, method = 'GET') {
  const token = getAccessToken();
  if (!token) throw new Error('No access token');

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    clearTokens();
    throw new Error('Token expired');
  }

  return await res.json();
}

export function getUserProfile() {
  return callSpotify('/me');
}

export function searchTracks(query) {
  return callSpotify(`/search?q=${encodeURIComponent(query)}&type=track&limit=20`);
}

export function getRecommendations(seedGenres = [], seedMoods = []) {
  const params = new URLSearchParams({
    seed_genres: seedGenres.join(','),
    limit: 20,
  });

  return callSpotify(`/recommendations?${params}`);
}
