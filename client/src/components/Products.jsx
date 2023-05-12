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
            <div>
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.funding}</p>
              <a href={product.externalLink}>More Info For This Item</a>
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
