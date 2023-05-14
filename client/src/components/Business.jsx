import React, { useState, useEffect } from "react";
import Products from "./Products";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_BUSINESS } from "../utils/queries";

const Business = ({ business }) => {
  const { data } = useQuery(QUERY_BUSINESS, {
    variables: {
      name: business.name,
    },
  });
  const myBusiness = data?.business || [];
  console.log("This is myBusiness", myBusiness);

  return (
    <div>
      <h3>Business Name: {myBusiness.name}</h3>
      <img src={myBusiness.imageUrl} alt={business.name} />
      <p>Location: {myBusiness.location}</p>
      <p>Description: {myBusiness.description}</p>
      <p>Mission Statement: {myBusiness.missionStatement}</p>
      <div>
        <a href={myBusiness.twitter}>Twitter</a>
        <a href={myBusiness.facebook}>Facebook</a>
        <a href={myBusiness.instagram}>Instagram</a>
      </div>
      <div>
        <h2>Products</h2>
        <div className="productContainer">
          {myBusiness.products &&
            myBusiness.products.map((product, i) => (
              <div key={i} className="product">
                <div className="innerProduct">
                  <img src={product.imageUrl} alt={product.name} />
                  <h2>{product.name}</h2>
                  <p>${product.funding}/{product.fundingGoal}</p>
                  <p>{product.description}</p>
                  <button type="button" className="fundBtn">
                    <Link to={`/product/${product._id}`} product={product}>
                      Fund This Item!
                    </Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2>Add a Product To Be Funded</h2>
        <AddProduct business={business} />
      </div>
    </div>
  );
};

export default Business;
