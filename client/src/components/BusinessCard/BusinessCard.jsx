import React from "react";
import { QUERY_BUSINESSES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Products from "../Products";
import twitter from "../../assets/icons/twitter.png";
import facebook from "../../assets/icons/facebook.png";
import instagram from "../../assets/icons/instagram.png";
import "./style.css";

const BusinessCard = () => {
  const { data } = useQuery(QUERY_BUSINESSES);
  const businesses = data?.businesses || [];
  console.log("businesses in BusinessCard", businesses);

  return (
    <div className="businessCard">
      {businesses &&
        businesses.map((business, i) => (
          <div key={i} className="business">
            <a href="#!">
              <img
                src={business.imageUrl}
                className="businessImg"
                alt="businessProfilePic"
              />
            </a>

            <div className="p-6 businessHeader">
              <h5 className="mb-2 text-xl font-bold leading-tight">
                {business.name}
              </h5>
              <p>
                <a href={business.website}>{business.website}</a>
              </p>
              <p className="mb-4">{business.location}</p>
              <p className="mb-4">{business.description}</p>
              <p className="mb-4">{business.missionStatement}</p>
              <button
                type="button"
                className="inline-block businessLaunchBtn"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <Link to={`/business/${business.name}`}>Launch Me</Link>
              </button>
              <Products products={business.products} />

              <p className="mb-4 text-center font-medium text-sm relative flex flex-row">
                <span className="hover:scale-150 duration-200 relative top-5 basis-1/4">
                  <a href={business.facebook}>
                    <img src={facebook} alt="" />
                  </a>
                </span>
                <span className="hover:scale-150 duration-200 relative top-5 basis-1/4">
                  <a href={business.twitter}>
                    <img src={twitter} alt="" />
                  </a>
                </span>
                <span className="hover:scale-150 duration-200 relative top-5 basis-1/4">
                  <a href={business.instagram}>
                    <img src={instagram} alt="" />
                  </a>
                </span>
              </p>
            </div>
            <div className="businessContent"></div>
            {/* <Products products={business.products} />
            <button type="button">Click to Launch</button>
            <Link to={`/business/${business.name}`}>Launch Me</Link> */}
          </div>
        ))}
    </div>
  );
};

export default BusinessCard;
