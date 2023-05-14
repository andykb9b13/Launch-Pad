import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_BUSINESS } from "../utils/queries";
import { useMutation } from "@apollo/react-hooks";
import UploadWidget from "../components/UploadWidget";
import BusinessSignUp from "./BusinessSignUp";
import { DELETE_BUSINESS } from "../utils/mutations";

const CustomBusinessProfile = () => {
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
    console.log("business id: ",data?.business._id);
    const businessId = data?.business._id;
        try {
        await deleteBusiness({
            variables: {id: businessId},
        });
        alert("Business deleted!");
    } catch (err) {
      console.log("catch block");
      console.error(err);
      alert("Unsuccessful delete. Please try again.");
    }
  }
    const [deleteBusiness, { error }] = useMutation(DELETE_BUSINESS);
  //   const [updateBusiness, { error }] = useMutation(ADD_BUSINESS);
  //   const [validated] = useState(false);

  return (
    <div>
      <div className="w-full justify-center items-center p-4">
        <h2>Business Profile for {data?.business.name}</h2>
        <form
          className="flex flex-col max-w-[800px] w-full bg-[var(--white)] p-6 mt-10"

        >
          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Business Name
          </label>
          <p>{data?.business.name}</p>

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Location
          </label>
          <p>{data?.business.location}</p>

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Website URL
          </label>
          <p>{data?.business.website}</p>

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Twitter
          </label>
          <p>{data?.business.twitter}</p>

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Facebook
          </label>
          <p>{data?.business.facebook}</p>

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Instagram
          </label>
          <p>{data?.business.instagram}</p>

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Description
          </label>
          <p>{data?.business.description}</p>

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Mission Statement
          </label>
          <p>{data?.business.missionStatement}</p>

          <div>

            {data?.business.imageUrl && (
              <>
                <h3>Profile Image</h3>
                <p>
                  <img src={data?.business.imageUrl} alt="Uploaded resource" />
                </p>
                <p>{data?.business.imageUrl}</p>
              </>
            )}
            <Link to={`/`}>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-[var(--red)] text-[var(--white)] font-bold py-2 px-4 my-2 rounded"
                >
                  Delete Profile
                </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomBusinessProfile;
