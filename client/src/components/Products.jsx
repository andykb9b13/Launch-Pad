import React from "react";

const Products = ({ products }) => {
  return (
    <div className="productArea">
      {products &&
        products.map((product) => (
          <div key={product._id} className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.funding}</p>
            <p>{product.donors}</p>
          </div>
        ))}
    </div>
  );
};

export default Products;
