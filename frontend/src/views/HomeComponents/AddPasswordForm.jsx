import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import MailInput from "./MailInput";
import PasswordInput from "./PasswordInput";
import PlatformInput from "./PlatformInput";
import axios from "axios";


export default function AddPasswordForm() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Platform,setPlatform] = useState("");
  const [showForm, setShowForm] = useState(true);

  // const handleAddPassword = async ()  => {
  
  //   try {
  //     console.log("adding password")
  //     const response = await axios.put('http://localhost:3000/api/v1/Users/addNewPassword', { Platform, email, Password: Platform,email, Password }, { withCredentials: true });
  //     if (response.status === 200) {
  //       console.log('Password added successfully');
  //     }


      
  //   } catch (error) {
  //     console.error('Add password error:', error);  
      
  //   }
  


  //   // Hide the form
  //   setShowForm(false);
  // };

  if (!showForm) {
    return null; // Return null to not render anything
  }

  return (
    <div className="flex flex-wrap justify-between items-center">
      <div className="flex gap-4">
        <PlatformInput value={Platform} onChange={(e) => setPlatform(e.target.value)}/>
        <MailInput value={email} onChange={(e) => setEmail(e.target.value)} />
        <PasswordInput value={Password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button color="primary" >Add Password</Button>
    </div>
  );
}
