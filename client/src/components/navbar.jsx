import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/launchpad-logo-placeholder.png";
import { FaBars, FaTimes } from 'react-icons/fa'
import Header1 from '../assets/backgrounds/header1.jpg';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div 
    className="fixed w-full h-[70px] flex justify-between items-center px-4 text-[var(--red)] z-10 bg-[var(--white)]"
    >
      <div className='border-2 rounded-lg border-[var(--white)]'>
        <Link to="/" smooth={true} duration={500}>
        <img src={Logo} alt='LaunchPad Logo' style={{ width: '50px' }} />
        </Link>
      </div>

      <h2 className="text-2xl md:text-4xl tracking-wider font-bold text-[var(--green)] hover:rotate-2 duration-150">
        <Link to="/" smooth={true} duration={500}>
           LaunchPad
        </Link>
      </h2>

       {/*Menu*/}
       <div className=''>
        <ul className="hidden md:flex text-2xl">
          <li className="hover:scale-110 duration-500">
            <Link to="/" smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li className="hover:scale-110 duration-500">
            <Link to="/user" smooth={true} duration={500}>
              Profile
            </Link>
          </li>
          <li className="hover:scale-110 duration-500">
            <Link to="/business" smooth={true} duration={500}>
              Business
            </Link>
          </li>
          <li className="hover:scale-110 duration-500">
            <Link to="/products" smooth={true} duration={500}>
              Browse
            </Link>
          </li>
          <li className="hover:scale-110 duration-500">
            <Link to="/signup" smooth={true} duration={500}>
              Login/Sign Up
            </Link>
          </li>
        </ul>
      </div>

 {/*Hamburger, only shows on mobile and brings up larger nav menu*/}
 <div onClick={handleClick} className="md:hidden z-10 hover:cursor-pointer">
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
          <Link onClick={handleClick} to="/business" smooth={true} duration={500}>
            Business
          </Link>
        </li>
        <li className="py-6 text-4xl">
          <Link onClick={handleClick} to="/products" smooth={true} duration={500}>
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