import {
  Navbar,
  NavbarBrand,
  NavbarContent
} from "@nextui-org/react";
// import { FaGithub } from "react-icons/fa";

// Assuming you have a key logo SVG
import KeyLogo from "../../assets/keyimage.png";
import Login from "./LoginModal.jsx";

export default function LandingPageNavBar() {
  return (
    <Navbar isBordered className="fixed top-0 left-0 w-full bg-white z-50">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4 flex items-center">
          <img src={KeyLogo} alt="Key Logo" className="h-6 mr-2" />
          <p className="hidden sm:block font-bold text-inherit">
            amen<span className="text-secondary-500">.</span>ly
          </p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3"></NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Login />
      </NavbarContent>
    </Navbar>
  );
}
