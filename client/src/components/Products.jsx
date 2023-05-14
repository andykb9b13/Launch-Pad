import React from "react";
import { Link } from "react-router-dom";
import "../styles/products.css";

const Products = ({ products }) => {
  console.log("products from component", products);
  return (
    <div className="productContainer">
      {products &&
        products.map((product, i) => (
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
  );
};

export default Products;
