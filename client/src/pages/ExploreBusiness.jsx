import React, { useEffect } from "react";
import { QUERY_BUSINESS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Products from "../components/Products";

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
      <div>
        <h2>{business.name}</h2>
        <div className="profileImg">
          <img src={business.imageUrl} alt="profile" />
        </div>
        <p>{business.missionStatement}</p>
      </div>
      <h2>These are the items that need funding</h2>
      <Products products={business.products} />
    </div>
  );
};

export default ExploreBusiness;
