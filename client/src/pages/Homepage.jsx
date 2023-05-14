import React from "react";
import BusinessCard from "../components/BusinessCard/BusinessCard";
import BusinessProfile from "./BusinessProfile";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";

const Homepage = () => {
  return (
    <div className="margin-top">
      <div className="banner">
        <h1>Launch Pad</h1>
        <h2 className="subtitle">where dreams are launched...</h2>
        <Link to="/newbusiness">
          <button className="launchBtn" type="button">
            Launch Business
          </button>
        </Link>
      </div>
      <div className="missionStatement">
        <div>
          <h2>What is LaunchPad?</h2>
          <p>
            Our mission at Launch Pad is to empower and support small businesses
            by providing a user-friendly platform for collecting donations. We
            recognize the crucial role that small businesses play in our
            communities and the challenges they face in accessing capital.
            Launch Pad is dedicated to bridging this gap by offering a secure
            and efficient way for users to make contributions directly to the
            businesses they wish to support. We believe that by connecting
            donors with small businesses in need, we can help create a more
            equitable and thriving economy for all.
          </p>
          <button className="exploreBtn" type="button">
            Explore Businesses
          </button>
        </div>
        <img
          className="missionImg"
          src="https://images.unsplash.com/photo-1537849244241-351b40016963?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
          alt="fundraising"
        />
      </div>
      <h2 className="text-center">Featured Businesses</h2>
      <BusinessCard />
    </div>
  );
};

export default Homepage;
