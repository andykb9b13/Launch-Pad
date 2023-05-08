import React, { useState } from "react";
import { Route, Link, Routes, useNavigate } from "react-router-dom";

export default function BusinessSignUp() {
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [twitterURL, setTwitterURL] = useState("");
  const [facebookURL, setFacebookURL] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [description, setDescription] = useState("");

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
  //set cancel button to previous page.
  const prevPage = () => {};
  //Move to next steps
  const onSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      businessName: businessName,
      location: location,
      websiteURL: websiteURL,
      twitterURL: twitterURL,
      facebookURL: facebookURL,
      instagramURL,
      instagramURL,
      description,
      description,
    };
    console.log(userInfo);
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      <form className="flex flex-col max-w-[800px] w-full bg-[var(--white)] p-6 mt-10">
        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Business Name
        </label>
        <input
          type="text"
          placeholder="Your Business Name"
          onChange={handleNameChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Location
        </label>
        <input
          type="text"
          placeholder="Business Location"
          onChange={handleLocationChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Website URL
        </label>
        <input
          type="text"
          placeholder="www.examplebusiness.com"
          onChange={handleWebsiteChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Twitter
        </label>
        <input
          type="text"
          placeholder="www.twitter.com/yourbusiness"
          onChange={handleTwitterChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Facebook
        </label>
        <input
          type="text"
          placeholder="www.facebook.com/yourbusiness"
          onChange={handleFacebookChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Instagram
        </label>
        <input
          type="text"
          placeholder="www.instagram.com/yourbusiness"
          onChange={handleInstagramChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Description
        </label>
        <textarea
          placeholder="Enter Description Here"
          onChange={handleDescriptionChange}
          rows="6"
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Mission Statement
        </label>
        <textarea
          placeholder="Enter Mission Statement Here"
          onChange={handleDescriptionChange}
          rows="6"
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--lime)] ml-2"
        />

        <div>
          <button
            className="bg-[var(--white)] border-2 border-[var(--lime)] rounded-lg hover:bg-[var(--lime)] hover:text-[var(--white)] px-10 py-3 my-2 mx-auto flex flex-center"
            type="submit"
          >
            Next
          </button>
          <button className="bg-[var(--white)] border-2 border-[var(--lime)] rounded-lg hover:bg-[var(--red)] hover:text-[var(--white)] px-10 py-3 my-2 mx-auto flex flex-center">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
