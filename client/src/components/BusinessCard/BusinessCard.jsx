import React from "react";
import { QUERY_BUSINESSES } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Products from "../Products";
import "./style.css";

const BusinessCard = () => {
  const { data } = useQuery(QUERY_BUSINESSES);
  const businesses = data?.businesses || [];
  console.log("businesses in BusinessCard", businesses);

  return (
    <div className="businessCard">
      {businesses &&
        businesses.map((business, i) => (
          <div key={i} className="border-4 business">
            <a href="#!">
              <img
                src={business.imageUrl}
                className="rounded-t-lg businessImg"
                alt="businessProfilePic"
              />
            </a>

            <div className="p-6 businessHeader">
              <h5 className="mb-2 text-xl font-bold leading-tight">
                {business.name}
              </h5>
              <p className="mb-4">
                <span className="font-medium">Company description: </span>
                {business.description}
              </p>
              <p className="mb-4">
                <span className="font-medium">Location: </span>
                {business.location}
              </p>

              <p className="mb-4">
                <span className="font-medium">Mission statement: </span>
                {business.missionStatement}
              </p>
              <button
                type="button"
                class="inline-block"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <Link to={`/business/${business.name}`}>Launch Me</Link>
              </button>
              <p className="mb-4 text-center text-base font-medium text-sm relative flex flex-row">
                <span className="hover:scale-150 duration-200 relative top-5 left-0 basis-1/4">
                  <a href={business.website}>Company Website</a>
                </span>
                <span className="hover:scale-150 duration-200 relative top-5 basis-1/4">
                  <a href={business.facebook}>Facebook</a>
                </span>
                <span className="hover:scale-150 duration-200 relative top-5 basis-1/4">
                  <a href={business.twitter}>Twitter</a>
                </span>
                <span className="hover:scale-150 duration-200 relative top-5 basis-1/4">
                  <a href={business.instagram}>Instagram</a>
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
