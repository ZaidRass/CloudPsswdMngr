import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import MailInput from "./MailInput";
import PasswordInput from "./PasswordInput";
import PlatformInput from "./PlatformInput";
import axios from "axios";

export default function EditPasswordForm({ passwordId }) {
  const [password, setPassword] = useState("");
  const [platform, setPlatform] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [platformEmail, setPlatformEmail] = useState("");

  const handleEditPassword = async () => {
    console.log("passwordId", passwordId);
    try {
      console.log("editing password");
      const response = await axios.put(
        `http://localhost:3000/api/v1/Users/updateCredentials/${passwordId}`,
        { platformEmail, platform, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Password edited successfully");
        // Reload the page after successful password addition
        window.location.reload();
      }
    } catch (error) {
      console.error("Edit password error:", error);
    }
    // Hide the form
    setShowForm(false);
  };

  if (!showForm) {
    return null; // Return null to not render anything
  }

  return (
    <div className="flex flex-wrap justify-between items-center">
      <div className="flex gap-4">
        <PlatformInput
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          
        />
        <MailInput
          value={platformEmail}
          onChange={(e) => setPlatformEmail(e.target.value)}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button color="primary" onClick={handleEditPassword}>
        Confirm changes
      </Button>
    </div>
  );
}
