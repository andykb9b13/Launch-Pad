import React from "react";
import { Link } from "react-router-dom";
import "../styles/products.css";

const TwoProducts = ({ products }) => {
  console.log("products from component", products);

  const twoProducts = products ? products.slice(0, 2) : [];

  return (
    <div className="productContainer">
      {twoProducts.map((product, i) => (
        <div key={i} className="product">
          <div className="innerProduct">
            <img src={product.imageUrl} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.funding}</p>
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
  );
};

export default TwoProducts;