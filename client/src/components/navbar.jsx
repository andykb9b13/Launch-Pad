import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="navbar">
      <div>
        <Link to="/" smooth={true} duration={500}>
          Launch Pad
        </Link>
      </div>

      {/*Menu*/}
      <div>
        <ul className="menuOptions">
          <li>
            <Link to="/" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/user" smooth={true} duration={500}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/business" smooth={true} duration={500}>
              Business
            </Link>
          </li>
          <li>
            <Link to="/products" smooth={true} duration={500}>
              Browse
            </Link>
          </li>
          <li>
            <Link to="/signup" smooth={true} duration={500}>
              Login/Sign Up
            </Link>
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
          <Link onClick={handleClick} to="/" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/user" smooth={true} duration={500}>
            Profile
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link
            onClick={handleClick}
            to="/business"
            smooth={true}
            duration={500}
          >
            Business
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link
            onClick={handleClick}
            to="/products"
            smooth={true}
            duration={500}
          >
            Browse
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/signup" smooth={true} duration={500}>
            Login/Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
