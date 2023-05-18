import React from "react";
import { QUERY_BUSINESS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import "../styles/business.css";

const ExploreBusiness = () => {
  const { name } = useParams();
  const { data } = useQuery(QUERY_BUSINESS, {
    variables: {
      name: name,
    },
  });
  const business = data?.business || [];

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
