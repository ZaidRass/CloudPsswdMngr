import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Divider, Image, Button } from "@nextui-org/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import ChangeUserEmail from './ChangeUserEmail';
import ChangeUserUsername from './ChangeUserUsername';
import ChangeUserPassword from './ChangeUserPassword';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users/profile', { withCredentials: true });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // Handle error, e.g., show an error message
      }
    };

    fetchProfile();
  }, []);

  const navigateToChangePassword = () => {
    // Redirect to Change Password component
    navigate('/profile/ChangeUserPassword');
    // window.location.href = "/profile/ChangeUserPassword"
  };

  const navigateToChangeEmail = () => {
    // Redirect to Change Email component
    navigate('/profile/ChangeUserEmail');
    // window.location.href = "/profile/ChangeUserEmail"

  };

  const navigateToChangeUsername = () => {
    // Redirect to Change Username component
    navigate('/profile/ChangeUserUsername');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-big">Profile</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div>
            <p><strong>Username:</strong> {userData && userData.username}</p>
            <Button onClick={navigateToChangeUsername}>Change Username</Button>
            <Divider />
          </div>
          <div>
            <p><strong>Email:</strong> {userData && userData.email}</p>
            <Button onClick={navigateToChangeEmail}>Change Email</Button>
            <Divider />
          </div>
          <div>
            <p><strong>Password:</strong> {userData && userData.platformPassword}</p>
            <Button onClick={navigateToChangePassword}>Change Password</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;