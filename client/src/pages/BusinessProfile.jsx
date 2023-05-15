import React, { useEffect } from "react";
import { QUERY_BUSINESS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import AddProduct from "../components/AddProduct";
import "../styles/business.css"

const BusinessProfile = () => {
  const { name } = useParams();
  console.log("name from useParams", name);
  // const name = "typehere";

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
      <div className="business-flex-page">
        <div>
          <h2>{business.name}</h2>
        </div>
      <h2>These are the items that need Some funding</h2>
      <Products products={business.products} />
      <div>
        <h2>Add a product for funding</h2>

          <AddProduct business={business} />
        </div>
      </div>
      
    </div>
  );
};

export default BusinessProfile;
