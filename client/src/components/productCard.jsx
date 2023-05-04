import React from "react";
import { Link } from "react-router-dom";
import { QUERY_PRODUCTS } from "../utils/queries";
import { useQuery } from "@apollo/client";

const itemCard = () => {
  // const { loading, data } = useQuery(QUERY_PRODUCTS);
  // const products = data?.products || [];

  return (
    <div>
      <h2>Funding Form</h2>
      <img src="" alt="product" />
      <div className="progressBar">
        <p>$0</p>
        <p className="progressAmt">$400</p>
      </div>
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

export default itemCard;
