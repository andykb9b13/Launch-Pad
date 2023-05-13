import React, { useState, useEffect } from "react";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import "../styles/userProfile.css";
import Products from "./Products";

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
      {loggedIn !== null ? (
        <div>
          <h2>You must be logged in to view your profile</h2>
          <button type="button" className="redirectBtn">
            <Link to="/login">Login</Link>
          </button>
          <button type="button" className="redirectBtn">
            <Link to="/signup">Signup</Link>
          </button>
        </div>
      ) : (
        <div>
          <h2>Profile</h2>
          <h3>Username: {user.username}</h3>
          <button type="button" className="bizLaunchBtn">
            <Link to="/newbusiness">Launch A Business</Link>
          </button>
          <div>
            <h2>My Business</h2>
            <div>
              {user.businesses.map((business) => (
                <div>
                  <h3>Business Name: {business.name}</h3>
                </div>
              ))}
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
            sapiente, quisquam et unde error perspiciatis deleniti sint a
            dolorum distinctio adipisci, nisi, corrupti eos laboriosam. Enim, ad
            ducimus? Minus, nulla.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
