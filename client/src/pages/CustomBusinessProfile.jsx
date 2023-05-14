import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_BUSINESS, QUERY_ME } from "../utils/queries";
import { useMutation } from "@apollo/react-hooks";
//import UploadWidget from "../components/UploadWidget";
//import BusinessSignUp from "./BusinessSignUp";
import { DELETE_BUSINESS } from "../utils/mutations";
import AddProduct from "../components/AddProduct";
import "../styles/custombus.css";

const CustomBusinessProfile = ({ business }) => {
  // grab name from url
  const { name } = useParams();
  console.log("name from useParams", name);
  // query business based on name from url
  const { data } = useQuery(QUERY_BUSINESS, {
    variables: {
      name: name,
    },
  });
  console.log("data from useQuery", data);

  const handleDelete = async () => {
    console.log("business id: ", data?.business._id);
    const businessId = data?.business._id;
    try {
      await deleteBusiness({
        variables: { id: businessId },
      });
      alert("Business deleted!");
    } catch (err) {
      console.log("catch block");
      console.error(err);
      alert("Unsuccessful delete. Please try again.");
    }
  };
  const [deleteBusiness, { error }] = useMutation(DELETE_BUSINESS);

  return (
    <div>
      <div className="business-profile-flex">
        <div className="business-profile-flex business-border">
          <h2>Business Profile for {data?.business.name}</h2>
          <form className="flex flex-col max-w-[800px] w-full bg-[var(--white)] p-6 align-biz-content bg-whitesmoke">
            <label className="text-[var(--red)] tracking-wider sm:text-2xl item-margin-biz biz-txt-decor">
              Business Name:
            </label>
            <p>{data?.business.name}</p>

            <label className="text-[var(--red)] tracking-wider sm:text-2xl item-margin-biz biz-txt-decor">
              Location:
            </label>
            <p>{data?.business.location}</p>
            <hr />

            <label className="text-[var(--red)] tracking-wider sm:text-2xl item-margin-biz biz-txt-decor">
              Website URL:
            </label>
            <p>{data?.business.website}</p>

            <label className="text-[var(--red)] tracking-wider sm:text-2xl item-margin-biz biz-txt-decor">
              Twitter:
            </label>
            <p>{data?.business.twitter}</p>

            <label className="text-[var(--red)] tracking-wider sm:text-2xl item-margin-biz biz-txt-decor">
              Facebook:
            </label>
            <p>{data?.business.facebook}</p>

            <label className="text-[var(--red)] tracking-wider sm:text-2xl item-margin-biz biz-txt-decor">
              Instagram:
            </label>
            <p>{data?.business.instagram}</p>

            <label className="text-[var(--red)] tracking-wider sm:text-2xl item-margin-biz biz-txt-decor">
              Description:
            </label>
            <p>{data?.business.description}</p>

            <label className="text-[var(--red)] tracking-wider sm:text-2xl item-margin-biz biz-txt-decor">
              Mission Statement:
            </label>
            <p>{data?.business.missionStatement}</p>

            <div>
              <div>
                {data?.business.imageUrl && (
                <>
                  <h3>Profile Image</h3>
                  <p>
                    <img
                      src={data?.business.imageUrl}
                      alt="Uploaded resource"
                    />
                  </p>
                  <p>{data?.business.imageUrl}</p>
                </>
              )}
              </div>
              
              <div>
                <div className="delet-margin-top">
                  <Link to={`/`}>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="bg-[var(--red)] text-[var(--white)] font-bold py-2 px-4 my-2 rounded item-margin-biz"
                    >
                      Delete Business Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
          {/* products div */}
          <div>
            <h2>Products</h2>
            <div className="productContainer">
              {data?.business.products &&
                data?.business.products.map((product, i) => (
                  <div key={i} className="product">
                    <div className="innerProduct">
                      <img src={product.imageUrl} alt={product.name} />
                      <h2>{product.name}</h2>
                      <p>
                        ${product.funding}/{product.fundingGoal}
                      </p>
                      <p>{product.description}</p>
                      <button type="button" className="fundBtn">
                        <Link to={`/product/${product._id}`} product={product}>
                          Fund This Item!
                        </Link>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2>Add a Product To Be Funded</h2>
            <AddProduct business={data?.business} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBusinessProfile;
