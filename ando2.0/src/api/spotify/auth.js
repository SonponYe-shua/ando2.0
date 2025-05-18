// src/api/spotify/auth.js

import { generateRandomString, generateCodeChallenge, getLoginUrl } from './authHelpers';
import { saveTokenData, clearTokens } from './token';

const clientId = 'a03adf3a50074d5cb12071ef1a826e0b';
const redirectUri = 'https://ando2-0.vercel.app/callback'; // Replace with your deployment URL if needed

export async function initiateLogin() {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateRandomString(16);

  localStorage.setItem('pkce_code_verifier', codeVerifier);
  localStorage.setItem('auth_state', state);

  const url = getLoginUrl(codeChallenge, state);
  window.location.href = url;
}

export async function handleAuthCallback(code, state) {
  const savedState = localStorage.getItem('auth_state');
  const codeVerifier = localStorage.getItem('pkce_code_verifier');

  if (state !== savedState) {
    throw new Error('Invalid state');
  }

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to get token');

  saveTokenData(data);
}
