import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <h1>This is the navbar</h1>
      <Link to="/">Home</Link>
      <Link to="/business">Business</Link>
      <Link to="/user">User</Link>
    </div>
  );
};

export default Navbar;
