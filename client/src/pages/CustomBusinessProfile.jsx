import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_BUSINESS } from "../utils/queries";
import { useMutation } from "@apollo/react-hooks";
import UploadWidget from "../components/UploadWidget";
import BusinessSignUp from "./BusinessSignUp";
import { DELETE_BUSINESS } from "../utils/mutations";

const CustomBusinessProfile = () => {
  const { name } = useParams();
  console.log("name from useParams", name);

  const { data } = useQuery(QUERY_BUSINESS, {
    variables: {
      name: "typehere",
    },
  });
  console.log("data from useQuery", data);

  const handleDelete = () => {
    console.log("business id: ",data?.business._id);
    //     try {
    //     await deleteBusiness({
    //         variables: {},
    //     })
    // }
  }
    const [deleteBusiness, { error }] = useMutation(DELETE_BUSINESS);
  //   const [updateBusiness, { error }] = useMutation(ADD_BUSINESS);
  //   const [validated] = useState(false);

  return (
    <div>
      <div className="w-full flex justify-center items-center p-4">
        <form
          className="flex flex-col max-w-[800px] w-full bg-[var(--white)] p-6 mt-10"

        >
          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Business Name
          </label>
          <input
            type="text"
            placeholder={`${data?.business.name}`}

            className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
          />

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Location
          </label>
          <input
            type="text"
            placeholder="Business Location"

            className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
          />

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Website URL
          </label>
          <input
            type="text"
            placeholder="www.examplebusiness.com"

            className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
          />

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Twitter
          </label>
          <input
            type="text"
            placeholder="www.twitter.com/yourbusiness"

            className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
          />

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Facebook
          </label>
          <input
            type="text"
            placeholder="www.facebook.com/yourbusiness"

            className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
          />

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Instagram
          </label>
          <input
            type="text"
            placeholder="www.instagram.com/yourbusiness"

            className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
          />

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Description
          </label>
          <textarea
            placeholder="Enter Description Here"

            rows="6"
            className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
          />

          <label className="text-[var(--red)] tracking-wider sm:text-2xl">
            Mission Statement
          </label>
          <textarea
            placeholder="Enter Mission Statement Here"

            rows="6"
            className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
          />

          <div>
            <UploadWidget>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button
                    className="bg-[var(--white)] border-2 border-[var(--lime)] rounded-lg hover:bg-[var(--lime)] hover:text-[var(--white)] px-10 py-3 my-2 mx-auto flex flex-center"
                    onClick={handleOnClick}
                  >
                    Upload an Image
                  </button>
                );
              }}
            </UploadWidget>

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
                {/* rest of the code */}
                {/* delete button */}
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
