import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { ADD_BUSINESS } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import UploadWidget from "../components/UploadWidget";
import "../styles/businessSignUp.css";

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
  const [loggedIn, setLoggedIn] = useState(false);
  const { data } = useQuery(QUERY_ME);
  const user = data?.me || [];

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
  }

  // use effect for logged in status
  useEffect(() => {
    setLoggedIn(false);
    if (user !== null) {
      setLoggedIn(true);
    }
  }, []);

  const validateForm = () => {
    let errors = {};
    let isValid = true;
    // business name validation
    if (!businessName.trim()) {
      errors.businessName =
        "Business name is a required field. Please enter business name.";
      isValid = false;
    }

    if (!description) {
      errors.description =
        "Description is a required field. Please enter a description.";
      isValid = false;
    } else if (description.length < 25) {
      errors.description =
        "The description must be at least 25 characters long.";
      isValid = false;
    }

    if (missionStatement.length < 25) {
      errors.missionStatement =
        "The mission statement must be at least 25 characters long.";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const [formErrors, setFormErrors] = useState({
    businessName: "",
    description: "",
    missionStatement: "",
  });

  //set cancel button to previous page.
  const prevPage = () => {
    navigate(`/`);
  };
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
    console.log("this is user Info: ", userInfo);
    if (validateForm()) {
      try {
        const { data } = await createBusiness({
          variables: { ...userInfo },
        });
        alert("Business created!");
        if (data) navigate(`/custom-business/${businessName}`);
      } catch (err) {
        console.error(err);
        alert("Business creation unsuccessful. Please try again.");
      }
    }
  };

  const [createBusiness, { error }] = useMutation(ADD_BUSINESS);

  return (
    <div>
      {data === undefined ? (
        <div>
          <h2>You must be logged in to create a business.</h2>
          <button type="button" className="redirectBtn">
            <Link to="/login">Login</Link>
          </button>
          <button type="button" className="redirectBtn">
            <Link to="/signup">Signup</Link>
          </button>
        </div>
      ) : (
        <div className="signUpContainer w-full flex justify-center flex-col items-center">
          <div className="businessBanner">
            <h1>Launch your dreams...</h1>
          </div>
          <div className="instructions">
            <h2>Create a Business Profile</h2>
            <p>Enter the information for your business</p>
          </div>
          <form
            className="businessSignUp flex flex-col max-w-[800px] w-full p-6 mt-10"
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
            {formErrors.businessName && (
              <span className="error">{formErrors.businessName}</span>
            )}

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
            {formErrors.description && (
              <span className="error">{formErrors.description}</span>
            )}

            <label className="text-[var(--red)] tracking-wider sm:text-2xl">
              Mission Statement
            </label>
            <textarea
              placeholder="Enter Mission Statement Here"
              onChange={handleMissionStatementChange}
              rows="6"
              className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
            />
            {formErrors.missionStatement && (
              <span className="error">{formErrors.missionStatement}</span>
            )}

            <div>
              <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button
                      className="bg-[var(--white)] border-2 border-[var(--green)] rounded-lg button-background button-background:hover px-10 py-3 my-2 mx-auto flex flex-center"
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
                </>
              )}
              <button
                className="bg-[var(--white)] border-2 border-[var(--lime)] rounded-lg button-background button-background:hover px-10 py-3 my-2 mx-auto flex flex-center"
                type="submit"
              >
                Create Profile
              </button>
              <button
                className="bg-[var(--white)] border-2 border-[var(--lime)] rounded-lg button-background button-background:hover px-10 py-3 my-2 mx-auto flex flex-center"
                onClick={prevPage}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
