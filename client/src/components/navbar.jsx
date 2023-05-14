import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Auth from "../utils/auth";
import "../styles/navbar.css"

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const handleLogout = async () => {
    try {
      Auth.logout();
      console.log("user was logged out");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-[70px] flex justify-between items-center px-4 z-10 nav-box-shadow z-index-1">
      <h2 className="text-2xl md:text-4xl tracking-wider duration-150">
        <Link to="/">LaunchPad</Link>
      </h2>

      {/*Menu*/}
      <div className="">
        <ul className="hidden md:flex text-2xl">
          <li className="hover:scale-110 duration-500 mx-2">
            <Link to="/user">Profile</Link>
          </li>
          {/* <li className="hover:scale-110 duration-500 mx-2">
            <Link to="/business">Business</Link>
          </li> */}

          <li className="hover:scale-110 duration-500 mx-2">
            <Link to="/login">Login</Link>
          </li>
          <li
            className="hover:scale-110 duration-500 mx-2"
            onClick={handleLogout}
          >
            Logout
          </li>
          <li className="hover:scale-110 duration-500 mx-2">
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </div>

      {/*Hamburger, only shows on mobile and brings up larger nav menu*/}
      <div
        onClick={handleClick}
        className="md:hidden z-10 hover:cursor-pointer"
      >
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/*Mobile Menu*/}
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[var(--lime)] flex flex-col justify-center items-center font-bold tracking-widest"
        }
      >
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/user">
            Profile
          </Link>
        </li>
        {/* <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/business">
            Business
          </Link>
        </li> */}
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/login"></Link>
        </li>
        <li className="hover:scale-110 duration-500" onClick={handleLogout}>
          Logout
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/signup">
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
