// ChangeUserUsername.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, ButtonGroup} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

function ChangeUserUsername() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleChangeUsername = async () => {
    try {
      await axios.put('http://ec2-16-170-228-249.eu-north-1.compute.amazonaws.com:3000/api/v1/users/profile/updateUsername', { username }, { withCredentials: true });
      navigate('/profile');
    } catch (error) {
      console.error('Error changing username:', error);
    }
  };

  const navigateBack = () => {
    navigate('/profile');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
            <p className="text-md">Change Username</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <Input type="Username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your new Username" />
        </CardBody>
        <Divider/>
        <CardFooter>
          <Button color="success" onClick={handleChangeUsername} variant="shadow">Save</Button>
          <Button color='danger' variant="shadow" onClick={navigateBack}>Back</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ChangeUserUsername;
