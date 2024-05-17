import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import UploadProfileImage from "./components/UploadImageModal";
import ProfileNavBar from "./components/ProfileNavBar"

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(""); // State to store image URL
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://website-load-balancer-903681776.eu-north-1.elb.amazonaws.com/api/v1/users/profile",
          { withCredentials: true }
        );
        setUserData(response.data);
        setLoading(false);
        // Call API to fetch profile picture
        //.log(response.)
        const pictureResponse = await axios.get(
          `http://website-load-balancer-903681776.eu-north-1.elb.amazonaws.com/api/v1/users/getProfilePic`,
          { withCredentials: true }
        );
        setImageUrl(pictureResponse.data.imageUrl);
        // refresh window
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle error, e.g., show an error message
      }
    };

    fetchProfile();
  }, []);

  const navigateToChangePassword = () => {
    // Redirect to Change Password component
    navigate("/profile/ChangeUserPassword");
  };

  const navigateToChangeEmail = () => {
    // Redirect to Change Email component
    navigate("/profile/ChangeUserEmail");
  };

  const navigateToChangeUsername = () => {
    // Redirect to Change Username component
    navigate("/profile/ChangeUserUsername");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ProfileNavBar />
      <Card className="max-w-[400px]">
 
        
        <CardBody>
          <div>
            <p>
              <strong>Username:</strong> {userData && userData.username}
            </p>
            <Button onClick={navigateToChangeUsername}>Change Username</Button>
            <Divider />
          </div>
          <div>
            <p>
              <strong>Email:</strong> {userData && userData.email}
            </p>
            <Button onClick={navigateToChangeEmail}>Change Email</Button>
            <Divider />
          </div>
          <div>
            <p>
              <strong>Password:</strong> {userData && userData.platformPassword}
            </p>
            <Button onClick={navigateToChangePassword}>Change Password</Button>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          {imageUrl && <Image src={imageUrl} width={200} height={200} alt="Profile Image" />}
          <UploadProfileImage />
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
