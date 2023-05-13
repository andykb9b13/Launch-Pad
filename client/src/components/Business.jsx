import React from "react";
import Products from "./Products";

const Business = ({ business }) => {
  return (
    <div>
      <h3>Business Name: {business.name}</h3>
      <img src={business.imageUrl} alt={business.name} />
      <p>Location: {business.location}</p>
      <p>Description: {business.description}</p>
      <p>Mission Statement: {business.missionStatement}</p>
      <div>
        <a href={business.twitter}>Twitter</a>
        <a href={business.facebook}>Facebook</a>
        <a href={business.instagram}>Instagram</a>
      </div>
      <div>
        <p>Products:</p>
        <Products products={business.products} />
      </div>
    </div>
  );
};

export default Business;
