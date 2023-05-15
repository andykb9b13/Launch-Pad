import React, { useEffect } from "react";
import { QUERY_BUSINESS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import "../styles/business.css";

const ExploreBusiness = () => {
  const { name } = useParams();
  console.log("name from useParams", name);

  const { data } = useQuery(QUERY_BUSINESS, {
    variables: {
      name: name,
    },
  });
  console.log("data from useQuery", data);

  const business = data?.business || [];

  // console.log("This is business in BusinessProfile", business);

  console.log("business.products", business.products);

  return (
    <div>
      <div className="business-flex-page styling-border">
        <div className="businessBox biz-flex-container styling-border">
          <h2>{business.name}</h2>
          <p>{business.location}</p>
          <div className="profileImg">
            <img src={business.imageUrl} alt="profile" />
          </div>
          <h3>Our Mission</h3>
          <p>{business.missionStatement}</p>
        </div>
        <Products products={business.products} />
      </div>
    </div>
  );
};

export default ExploreBusiness;
