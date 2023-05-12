import React from "react";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { data } = useQuery(QUERY_ME);

  console.log("This is data in userProfile", data);
  const user = data?.me || [];

  console.log("This is user in the UserProfile", user);

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <h3>Username: {user.username}</h3>
        <button type="button">
          <Link to="/newbusiness">Launch A Business</Link>
        </button>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
          sapiente, quisquam et unde error perspiciatis deleniti sint a dolorum
          distinctio adipisci, nisi, corrupti eos laboriosam. Enim, ad ducimus?
          Minus, nulla.
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
