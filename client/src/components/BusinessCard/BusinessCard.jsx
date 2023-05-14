import React from "react";
import { QUERY_BUSINESSES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import TwoProducts from "../TwoProducts";
import twitter from "../../assets/icons/twitter.png";
import facebook from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram.png";
import "./style.css";

const BusinessCard = () => {
  const { data } = useQuery(QUERY_BUSINESSES);
  const businesses = data?.businesses || [];

  // Select a random business
  const randomBusiness =
    businesses[Math.floor(Math.random() * businesses.length)];

  return (
    <div className="businessCard">
      {randomBusiness && (
        <div className="business">
          <div className="businessDetails">
            <a href="#!">
              <img
                src={randomBusiness.imageUrl}
                className="businessImg"
                alt="businessProfilePic"
              />
            </a>

            <h2 className="businessName">{randomBusiness.name}</h2>
            <a className="businessWebsite" href={randomBusiness.website}>
              {randomBusiness.website}
            </a>
            <p className="mb-4">{randomBusiness.location}</p>
            <p className="mb-4">{randomBusiness.description}</p>
            <button
              type="button"
              className="inline-block businessLaunchBtn"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <Link to={`/business/${randomBusiness.name}`}>Learn More</Link>
            </button>
          </div>
          <div className="businessProducts p-6">
            <TwoProducts products={randomBusiness.products} />
            <div className="socialIcons">
              <a href={randomBusiness.facebook}>
                <img src={facebook} alt="facebook" />
              </a>
              <a href={randomBusiness.twitter}>
                <img src={twitter} alt="twitter" />
              </a>
              <a href={randomBusiness.instagram}>
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessCard;
