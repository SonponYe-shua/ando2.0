// src/api/spotify/token.js

const ACCESS_TOKEN_KEY = 'spotify_access_token';
const REFRESH_TOKEN_KEY = 'spotify_refresh_token';
const EXPIRY_TIME_KEY = 'spotify_token_expiry';

export function saveTokenData({ access_token, refresh_token, expires_in }) {
  const expiryTime = Date.now() + expires_in * 1000;

  localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
  if (refresh_token) localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  localStorage.setItem(EXPIRY_TIME_KEY, expiryTime.toString());
}

export function getAccessToken() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  const expiry = parseInt(localStorage.getItem(EXPIRY_TIME_KEY), 10);
  if (!token || !expiry || Date.now() > expiry) return null;
  return token;
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRY_TIME_KEY);
}
