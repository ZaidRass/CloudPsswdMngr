import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { SearchIcon } from "./searchicon.jsx";
import { useEffect, useState } from "react";

// Assuming you have a key logo SVG
import KeyLogo from "../../assets/keyimage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileNavbar() {
  const Navigator = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const handleProfile = () => {
    Navigator("/profile");
  };

  const handleLogout = async () => {
    try {
      console.log("logging out");
      const response = await axios.post(
        `http://website-load-balancer-903681776.eu-north-1.elb.amazonaws.com/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Logout response:", response);
      Navigator("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {

        // Call API to fetch profile picture
        const pictureResponse = await axios.get(
          `http://website-load-balancer-903681776.eu-north-1.elb.amazonaws.com/api/v1/users/getProfilePic`,
          { withCredentials: true }
        );
        
        console.log("here112351",pictureResponse.data.imageUrl)
        setImageUrl(pictureResponse.data.imageUrl);
        // refresh window
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Handle error, e.g., show an error message
      }
    };

    fetchProfile();
  }, []);
  return (
    <Navbar isBordered className="fixed top-0 left-0 w-full bg-white z-50">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4 flex items-center">
          <img src={KeyLogo} alt="Key Logo" className="h-6 mr-2" />
          <p className="hidden sm:block font-bold text-inherit">
            Amen.ly
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3"></NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={imageUrl}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {/* <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue="profile"
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold"> Ahmed</p>
            </DropdownItem> */}
            <DropdownItem
              key="Edit_Profile"
              textValue="Edit Profile"
              onClick={handleProfile}
            >
              Edit Profile
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              textValue="Log Out"
              onClick={handleLogout}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
