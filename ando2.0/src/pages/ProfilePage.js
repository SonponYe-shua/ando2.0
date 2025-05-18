// src/pages/ProfilePage.js
import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../api/spotify/token';
import { getUserProfile } from '../api/spotify/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getAccessToken();
      const user = await getUserProfile(token);
      setProfile(user);
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>Spotify Profile</h2>
      <img src={profile.images[0]?.url} alt="Profile" width={100} />
      <p><strong>Name:</strong> {profile.display_name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
};

export default ProfilePage;
