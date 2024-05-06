import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineTool, AiOutlineArrowLeft } from "react-icons/ai";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/users/profile",
          { withCredentials: true }
        );

        setUser(response.data.user);
        setNewEmail(response.data.user.Email);
        setNewUsername(response.data.user.Username);
        setNewPhoneNumber(response.data.user.PhoneNumber);
        setUserId(response.data.user._id);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, [userId]); // Add an empty dependency array to run the effect only once

  const handleUpdateUsername = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/users/profile/updateUsername`,
        { newUsername },
        { withCredentials: true }
      );
      console.log("Username updated successfully!");
    } catch (error) {
      console.error("Username update failed:", error.message);
    }
  };

  const handleUpdateEmail = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/users/profile/updateEmail`,
        { newEmail },
        { withCredentials: true }
      );
      console.log("Email updated successfully!");
    } catch (error) {
      console.error("Email update failed:", error.message);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/users/profile/updatePassword`,
        { newPassword },
        { withCredentials: true }
      );
      console.log("Password updated successfully!");
    } catch (error) {
      console.error("Password update failed:", error.message);
    }
  };

  const handleUpdateProfile = async () => {
    await Promise.all([
      handleUpdateUsername(),
      handleUpdateEmail(),
      handleUpdatePassword()
    ]);
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="max-w-[800px] mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6">Update Your Profile</h1>
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        {/* Input fields for email, username, password, and phone number */}
        {/* Update functions for each field */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-full focus:outline-none hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={handleGoBack}
          className="flex items-center text-blue-500 hover:underline focus:outline-none"
        >
          <AiOutlineArrowLeft className="mr-2" />
          Back to Previous Page
        </button>
      </div>
    </div>
  );
};

export default Profile;
