// ChangeUserEmail.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image } from "@nextui-org/react";

function ChangeUserEmail() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChangeEmail = async () => {
    try {
      await axios.put('http://website-load-balancer-903681776.eu-north-1.elb.amazonaws.com/api/v1/users/profile/updateEmail', { email }, { withCredentials: true });
      navigate("/profile");
    } catch (error) {
      console.error('Error changing email:', error);
    }
  };

  const navigateBack = () => {
    navigate("/profile");
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
            <p className="text-md">Change Email</p>
          </div>
        </CardHeader>
        <Divider/>
        <CardBody>
          <Input type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your new email" />
        </CardBody>
        <Divider/>
        <CardFooter>
          <Button color="success" onClick={handleChangeEmail} variant="shadow">Save</Button>
          <Button color='danger' variant="shadow" onClick={navigateBack}>Back</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ChangeUserEmail;

