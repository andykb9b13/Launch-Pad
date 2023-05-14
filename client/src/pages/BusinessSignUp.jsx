import React, { useState } from "react";
import { Route, Link, Routes, useNavigate, redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { ADD_BUSINESS } from "../utils/mutations";
import UploadWidget from "../components/UploadWidget";
import BusinessProfile from "./BusinessProfile";

export default function BusinessSignUp() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [description, setDescription] = useState("");
  const [missionStatement, setMissionStatement] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  //Handle & store Changes for input values
  //Handle & store Changes for input values
  function handleNameChange(e) {
    setBusinessName(e.target.value);
  }
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }
  function handleWebsiteChange(e) {
    setWebsiteURL(e.target.value);
  }
  function handleTwitterChange(e) {
    setTwitterURL(e.target.value);
  }
  function handleFacebookChange(e) {
    setFacebookURL(e.target.value);
  }
  function handleInstagramChange(e) {
    setInstagramURL(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleMissionStatementChange(e) {
    setMissionStatement(e.target.value);
  }

  function handleOnUpload(error, result, widget) {
    if (error) {
      widget.close({
        quiet: true,
      });
      return;
    }
    setImageUrl(result?.info?.secure_url);
    console.log("This is the result in handleUpload", result.info.secure_url);
  }

  //set cancel button to previous page.
  const prevPage = () => {};
  //Move to next steps
  const onSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      name: businessName,
      location: location,
      website: websiteURL,
      twitter: twitterURL,
      facebook: facebookURL,
      instagram: instagramURL,
      description: description,
      missionStatement: missionStatement,
      imageUrl: imageUrl,
    };
    console.log("this is user Info: ",userInfo);

    try {
      const { data } = await createBusiness({
        variables: { ...userInfo },
      });
      alert("Business created!");
      if (data) navigate(`/custom-business/${businessName}`);
    } catch (err) {
      console.log("you're in the catch block");
      console.error(err);
      alert("Business creation unsuccessful. Please try again.");
    }
  };

  const [createBusiness, { error }] = useMutation(ADD_BUSINESS);
  const [validated] = useState(false);

  return (
    <div className="w-full flex justify-center items-center p-4">
      <form
        className="flex flex-col max-w-[800px] w-full bg-[var(--white)] p-6 mt-10"
        onSubmit={onSubmit}
      >
        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Business Name
        </label>
        <input
          type="text"
          placeholder="Your Business Name"
          onChange={handleNameChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Location
        </label>
        <input
          type="text"
          placeholder="Business Location"
          onChange={handleLocationChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Website URL
        </label>
        <input
          type="text"
          placeholder="www.examplebusiness.com"
          onChange={handleWebsiteChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Twitter
        </label>
        <input
          type="text"
          placeholder="www.twitter.com/yourbusiness"
          onChange={handleTwitterChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Facebook
        </label>
        <input
          type="text"
          placeholder="www.facebook.com/yourbusiness"
          onChange={handleFacebookChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Instagram
        </label>
        <input
          type="text"
          placeholder="www.instagram.com/yourbusiness"
          onChange={handleInstagramChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Description
        </label>
        <textarea
          placeholder="Enter Description Here"
          onChange={handleDescriptionChange}
          rows="6"
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Mission Statement
        </label>
        <textarea
          placeholder="Enter Mission Statement Here"
          onChange={handleMissionStatementChange}
          rows="6"
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

        <div>
          <UploadWidget onUpload={handleOnUpload}>
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button
                  className="bg-[var(--white)] border-2 border-[var(--green)] rounded-lg hover:bg-[var(--lime)] hover:text-[var(--white)] px-10 py-3 my-2 mx-auto flex flex-center"
                  onClick={handleOnClick}
                >
                  Upload an Image
                </button>
              );
            }}
          </UploadWidget>

          {imageUrl && (
            <>
              <h3>Profile Image</h3>
              <p>
                <img src={imageUrl} alt="Uploaded resource" />
              </p>
              <p>{imageUrl}</p>
            </>
          )}
          {/* <Link to={`/custom-business/${businessName}`}> */}
            <button
              className="bg-[var(--white)] border-2 border-[var(--lime)] rounded-lg hover:bg-[var(--lime)] hover:text-[var(--white)] px-10 py-3 my-2 mx-auto flex flex-center"
              type="submit"
            >
              Create Profile
            </button>
          {/* </Link> */}
          <button className="bg-[var(--white)] border-2 border-[var(--lime)] rounded-lg hover:bg-[var(--red)] hover:text-[var(--white)] px-10 py-3 my-2 mx-auto flex flex-center">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
