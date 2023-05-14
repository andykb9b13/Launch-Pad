import React from "react";
import { QUERY_BUSINESSES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Products from "../components/Products";
import twitter from "../assets/icons/twitter.png";
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import "../components/BusinessCard/style.css";
import TwoProducts from "../components/TwoProducts";

const Businesses = () => {
  const { data } = useQuery(QUERY_BUSINESSES);
  const businesses = data?.businesses || [];
  console.log(businesses.length);
  console.log("businesses in BusinessCard", businesses);

  return (
    <div className="businessCard">
      <div className="businessHeader">
        <h1>A little bit can go a long way...</h1>
        <h2>
          Even the smallest donation can help a business realize their dream of
          reaching people and making a difference.
        </h2>
      </div>
      {businesses &&
        businesses.map((business, i) => (
          <div key={i} className="business">
            <div className="businessDetails">
              <a href="#!">
                <img
                  src={business.imageUrl}
                  className="businessImg"
                  alt="businessProfilePic"
                />
              </a>

              <h2 className="businessName">{business.name}</h2>
              <a className="businessWebsite" href={business.website}>
                {business.website}
              </a>
              <p className="mb-4">{business.location}</p>
              <p className="mb-4">{business.description}</p>
              <button
                type="button"
                className="inline-block businessLaunchBtn"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <Link to={`/business/${business.name}`}>Learn More</Link>
              </button>
            </div>
            <div className="businessProducts p-6">
              <TwoProducts products={business.products} />
              <div className="socialIcons">
                <a href={business.facebook}>
                  <img src={facebook} alt="facebook" />
                </a>
                <a href={business.twitter}>
                  <img src={twitter} alt="twitter" />
                </a>
                <a href={business.instagram}>
                  <img src={instagram} alt="instagram" />
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Businesses;
