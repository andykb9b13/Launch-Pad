import React from "react";
import { Link } from "react-router-dom";

const itemCard = () => {
  return (
    <div>
      <h2>Funding Form</h2>
      <img src="" alt="item" />
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
      <Link>Sign in to donate</Link>
      <Link>Back to Business</Link>
    </div>
  );
};

export default itemCard;
