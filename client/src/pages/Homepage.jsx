import React from "react";
import BusinessCard from "../components/BusinessCard/BusinessCard";
import BusinessProfile from "./BusinessProfile";
import "../styles/Homepage.css";

const Homepage = () => {
  return (
    <div>
      <div className="banner">
        <h1>Launch Pad</h1>
        <h2 className="subtitle">Where dreams are launched...</h2>
      </div>
      <h2 className="text-center">Featured Businesses</h2>
      <div className="businessCardContainer">
        <BusinessCard />
      </div>
    </div>
  );
};

export default Homepage;
