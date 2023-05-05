import React from "react";

const Products = ({ products }) => {
  console.log("products from component", products);
  return (
    <div className="productArea">
      {products.map((product, i) => (
        <div key={i} className="product">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.funding}</p>
          <p>{product.externalLink}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
