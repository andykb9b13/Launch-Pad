import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/launchpad-logo-placeholder.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#A3DE83] text-white">
      <div>
        <img src={Logo} alt='LaunchPad Logo' style={{ width: '50px' }} />
      </div>
      
      
      <h1>This is the navbar</h1>
      <Link to="/">Home</Link>
      <Link to="/business">Business</Link>
      <Link to="/user">User</Link>
    </div>
  );
};

export default Navbar;