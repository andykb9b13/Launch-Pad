import React from "react";
import { QUERY_PRODUCT } from "../utils/queries";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const ProductCard = () => {
  const { productId } = useParams();
  console.log("productId", productId);

  const { data } = useQuery(QUERY_PRODUCT, {
    variables: {
      productId: productId,
    },
  });

  console.log("data from productId", data);
  const product = data?.product || [];

  return (
    <div>
      <h2>Funding Form</h2>
      <h3>{product.name}</h3>
      <img src="" alt="product" />
      <div className="progressBar">
        <h3>How much is raised so far...</h3>
        <p className="progressAmt">${product.funding}</p>
      </div>
      <a href={product.externalLink}>Buy it now</a>
      <form action="submit">
        <label htmlFor="donateAmt">Enter amount you want to donate</label>
        <input type="text" />
        <label htmlFor="message">Write a message</label>
        <textarea cols="20" rows="20"></textarea>
        <button>Donate</button>
      </form>
      {/* check these links, they are placeholders on 5/3 */}
      <Link to="/signup">Sign in to donate</Link>
      <Link to="/business">Back to Business</Link>
    </div>
  );
};

export default ProductCard;
