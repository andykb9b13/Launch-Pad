import React from "react";
import { QUERY_BUSINESS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import AddProduct from "../components/AddProduct";
import "../styles/business.css";

const BusinessProfile = () => {
  const { name } = useParams();
  const { data } = useQuery(QUERY_BUSINESS, {
    variables: {
      name: name,
    },
  });

  const business = data?.business || [];

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
