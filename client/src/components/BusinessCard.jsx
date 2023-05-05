import React from "react";
import { QUERY_BUSINESSES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Products from "./Products";

const BusinessCard = () => {
  const { data } = useQuery(QUERY_BUSINESSES);
  const businesses = data?.businesses || [];
  console.log("data in businessCard", data);

  return (
    <div className="businessCards">
      {businesses &&
        businesses.map((business, i) => (
          <div key={i} className="businessCard">
            <div className="businessHeader">
              <h2 className="text-[var(--red)]">{business.name}</h2>
            </div>
            <div className="businessContent">
              <img src={business.sponsor} alt="businessProfilePic" />
              <p>{business.description}</p>
              <p>{business.location}</p>
              <a href={business.website}>Website</a>
              <a href={business.facebook}>Facebook</a>
              <a href={business.twitter}>Twitter</a>
              <a href={business.instagram}>Instagram</a>
              <p>{business.missionStatement}</p>
            </div>
            <Products products={business.products} />
            <button type="button">Click to Launch</button>
          </div>
        ))}
    </div>
  );
};

export default BusinessCard;
