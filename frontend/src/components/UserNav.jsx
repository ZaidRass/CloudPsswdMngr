import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";

const ClientNav = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4">
        {/* Left side */}
        <div className="flex items-center">
          <div onClick={() => setNav(!nav)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          {/* Profile Button */}
          <div
            className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
            onClick={() => navigate("/Profile")}
          >
            <AiOutlineUser size={25} className="mr-4" /> Profile
          </div>
          {/* Logout Button */}
          <div
            onClick={() => {
              // Perform logout action here (e.g., clear session, remove tokens, etc.)
              // Then, redirect to the home page
              navigate('/');
            }}
            className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
          >
            <AiOutlineLogout size={25} className="mr-4" /> Logout
          </div>
        </div>
      </div>

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 shadow-lg"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer"
        />
        <h2 className="text-2xl p-4">My Menu</h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            {/* Profile */}
            <li
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
              onClick={() => {
                navigate("/Profile");
                setNav(false);
              }}
            >
              <AiOutlineUser size={25} className="mr-4" /> Profile
            </li>
            {/* Logout */}
            <li
              onClick={() => {
                // Perform logout action here (e.g., clear session, remove tokens, etc.)
                // Then, redirect to the home page
                navigate('/');
                setNav(false);
              }}
              className="text-xl py-4 flex items-center transition ease-in-out duration-300 hover:bg-blue-50 hover:shadow-md cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ClientNav;
