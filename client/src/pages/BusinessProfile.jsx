import React from "react";
import { QUERY_BUSINESS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Products from "../components/Products";

const BusinessProfile = () => {
  const { data } = useQuery(QUERY_BUSINESS);
  const business = data?.business || [];

  return (
    <div>
      <h1>This is a business Profile</h1>
      <div>
        <h2>{business.name}</h2>
        <div className="missionVideo">
          This is where a mission statement video could go
        </div>
        <p>{business.description}</p>
      </div>
      <h2>These are the items that need funding</h2>
      <Products products={business.products} />
    </div>
  );
};

export default BusinessProfile;
