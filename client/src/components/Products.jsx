import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
  console.log("products from component", products);
  return (
    <div className="productArea">
      {products &&
        products.map((product, i) => (
          <div key={i} className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.funding}</p>
            <p>{product.externalLink}</p>
            <Link to={`/product/${product._id}`} product={product}>
              Fund This Product
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Products;
