import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const accessToken = useSelector((state) => state.user.accessToken); // Get the accessToken from the Redux store

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!accessToken) {
          console.log('No access token found');
          return;
        }

        const response = await fetch('http://localhost:8888/profile', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfileData(data.data);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchProfile();
  }, [accessToken]); // Add accessToken as a dependency to the useEffect hook

  if (!profileData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <p className="text-xl mb-2">Name: {profileData.name}</p>
      <p className="text-xl mb-2">Email: {profileData.email}</p>
      <p className="text-xl mb-2">Phone: {profileData.phone}</p>
      <p className="text-xl mb-2">Address: {profileData.address}</p>
      <p className="text-xl mb-2">Position: {profileData.position}</p>
      <p className="text-xl mb-2">Club Name: {profileData.clubName}</p>
      <p className="text-xl mb-2">SeaSon: {profileData.seaSon}</p>
    </div>
  );
}