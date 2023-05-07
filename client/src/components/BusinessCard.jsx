import React from "react";
import { QUERY_BUSINESSES } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Products from "./Products";
import "../styles/BusinessCard.css";

const BusinessCard = () => {
  const { data } = useQuery(QUERY_BUSINESSES);
  const businesses = data?.businesses || [];
  console.log("data in businessCard", data);

  return (
    <div className="grid grid-cols-3 gap-4 businessCards ">
      {businesses &&
        businesses.map((business, i) => (
          <div
            key={i}
            className="border-4 border-[var(--lime)] block rounded-lg bg-[var(--white)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 business-card"
          >
            <a href="#!">
              <img
                src={business.imageUrl}
                className="rounded-t-lg"
                alt="businessProfilePic"
              />
            </a>

            <div className="p-6 businessHeader">
              <h5 className="mb-2 text-xl font-bold leading-tight text-[var(--red)]">
                {business.name}
              </h5>
              <p className="mb-4 text-base text-[var(--green)]">
                <span className="font-medium">Company description: </span>{business.description}
              </p>
              <p className="mb-4 text-base text-[var(--green)]">
              <span className="font-medium">Location: </span>{business.location}
              </p>

              <p className="mb-4 text-base text-[var(--green)]">
              <span className="font-medium">Mission statement: </span>{business.missionStatement}
              </p>
              <button
                type="button"
                class="inline-block rounded bg-[var(--red)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <Link to={`/business/${business.name}`}>Launch Me</Link>
              </button>
              <p className="mb-4 text-center text-base font-medium text-sm text-[var(--green)] relative flex flex-row">
                <span className="hover:scale-150 duration-200 relative top-5 left-0 basis-1/4">
                  <a href={business.website}>Company Website</a>
                </span>
                <span className="hover:scale-150 duration-200 relative top-5 basis-1/4"><a href={business.facebook}>Facebook</a></span>
                <span className="hover:scale-150 duration-200 relative top-5 basis-1/4"><a href={business.twitter}>Twitter</a></span>
                <span className="hover:scale-150 duration-200 relative top-5 basis-1/4"><a href={business.instagram}>Instagram</a></span>
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
