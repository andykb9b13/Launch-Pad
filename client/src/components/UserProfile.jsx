import React, { useState, useEffect } from "react";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "../styles/userProfile.css";
import Business from "./Business";

const UserProfile = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || [];

  console.log("This is data in userProfile", data);
  console.log("loggedIn", loggedIn);
  console.log("This is user in the UserProfile", user);

  useEffect(() => {
    setLoggedIn(false);
    console.log("This is user at the beginning of useEffect", user);
    if (user !== null) {
      setLoggedIn(true);
    }
    console.log("This is user in useEffect", user);
    console.log("This is loggedIn in useEffect", loggedIn);
  }, []);

  return (
    <div>
      {data === undefined ? (
        <div>
          <div className="flex-profile margin-top-profile">
          <h2>You must be logged in to view your profile</h2>
          <br />
          <div className="flex-row-btn">
          <button type="button" className="redirectBtn prof-btn-pad prof-marg btn-width flex-btn btn-bg-color btn-bg-color:hover">
            <Link to="/login">Login</Link>
          </button>
          <button type="button" className="redirectBtn prof-btn-pad prof-marg btn-width flex-btn btn-bg-color btn-bg-color:hover">
            <Link to="/signup">Signup</Link>
          </button>
          </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Profile</h2>
          <h3>Username: {user.username}</h3>
          <button type="button" className="bizLaunchBtn">
            <Link to="/newbusiness">Launch A Business</Link>
          </button>
          <div>
            <h2>My Businesses</h2>
            <div>
              {user.businesses.map((business, i) => (
                <div key={i}>
                  <Business business={business} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
