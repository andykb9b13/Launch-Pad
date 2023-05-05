import React from "react";
import { QUERY_BUSINESSES } from "../utils/queries";
import { useQuery } from "@apollo/client";

const BusinessCard = () => {
  const { data } = useQuery(QUERY_BUSINESSES);
  const businesses = data?.businesses || [];
  console.log("data in businessCard", data);

  return (
    <div className="business-cards">
      {businesses.map((business, i) => (
        <div key={i} className="business-card">
          <div className="business-header">
            <h2>{business.name}</h2>
          </div>
          <div className="business-content">
            <img src={business.sponsor} alt="business-profile-pic" />
            <p>{business.description}</p>
          </div>
          <button type="button">Click to Launch</button>
        </div>
      ))}
    </div>
  );
};

export default BusinessCard;
