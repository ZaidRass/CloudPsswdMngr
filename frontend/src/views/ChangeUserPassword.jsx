import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";

function ChangeUserPassword() {
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    try {
      await axios.put('http://localhost:3000/api/v1/users/profile/updatePassword', { password, confirm_password }, { withCredentials: true });
      await axios.get('http://localhost:3000/api/v1/users/logout', { withCredentials: true });
      navigate('/');
      //navigate('/profile');
    } catch (error) {
      console.error('Error changing password:', error);
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
            <p className="text-md">Change Password</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <Input type="password" label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your new password" />
          <Input type="password" label="Confirm Password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} placeholder="Confirm your new password" />
        </CardBody>
        <Divider/>
        <CardFooter>
          <Button color="success" onClick={handleChangePassword} variant="shadow">Save</Button>
          <Button color='danger' variant="shadow" onClick={navigateBack}>Back</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ChangeUserPassword;

