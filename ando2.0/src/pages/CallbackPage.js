// src/pages/CallbackPage.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAuthCallback } from '../api/spotify/auth';


const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const process = async () => {
      await handleAuthCallback();
      navigate('/');
    };

    process();
  }, [navigate]);

  return <p>Redirecting...</p>;
};

export default CallbackPage;
