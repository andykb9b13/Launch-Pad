import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_PRODUCT } from "../utils/mutations";
import UploadWidget from "./UploadWidget";
import "../styles/userProfile.css";

export default function AddProduct({ business }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productFunding, setProductFunding] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // validate form input
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // product name validation
    if (!productName) {
      errors.productName =
        "Product name is a required field. Please enter a product name.";
      isValid = false;
    }

    // product description validation
    if (!productDescription) {
      errors.productDescription =
        "Product description is a required field. Please enter a product description.";
      isValid = false;
    }

    // funding goal validation
    if (!productFunding) {
      errors.productFunding =
        "Funding needed is a required field. Please enter funding needed.";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };
  // form error validation
  const [formErrors, setFormErrors] = useState({
    productName: "",
    productDescription: "",
    productFunding: "",
  });

  function handleProductNameChange(e) {
    setProductName(e.target.value);
  }
  function handleProductDescriptionChange(e) {
    setProductDescription(e.target.value);
  }
  function handleProductFundingChange(e) {
    setProductFunding(e.target.value);
  }
  function handleExternalLinkChange(e) {
    setExternalLink(e.target.value);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const productInfo = {
      name: productName,
      description: productDescription,
      funding: 0,
      fundingGoal: parseInt(productFunding),
      externalLink: externalLink,
      imageUrl: imageUrl,
      businessId: business._id,
    };
    console.log("productInfo", productInfo);
    if (validateForm()) {
      try {
        const { data } = await createProduct({
          variables: { ...productInfo },
        });
        console.log("This is data in createProduct", data);
        setProductName("");
        setProductDescription("");
        setProductFunding("");
        setExternalLink("");
        setImageUrl("");
        alert("Product successfully added!");
      } catch (err) {
        console.error(err);
        alert("Product not added. Please try again.");
      }
    }
  };

  const [createProduct, { error }] = useMutation(ADD_PRODUCT);
  const [validated] = useState(false);

  return (
    <div className="w-full flex justify-center items-center p-4">
      <form
        className="flex flex-col max-w-[800px] w-full bg-[var(--white)] p-6 mt-10"
        onSubmit={onSubmit}
      >
        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Product Name
        </label>
        <input
          type="text"
          placeholder=""
          onChange={handleProductNameChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />
        {formErrors.productName && (
          <span className="error">{formErrors.productName}</span>
        )}

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Description
        </label>
        <input
          type="text"
          placeholder=""
          onChange={handleProductDescriptionChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />
        {formErrors.productDescription && (
          <span className="error">{formErrors.productDescription}</span>
        )}

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Funding Needed
        </label>
        <input
          type="text"
          placeholder=""
          onChange={handleProductFundingChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />
        {formErrors.productFunding && (
          <span className="error">{formErrors.productFunding}</span>
        )}

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          External Link
        </label>
        <input
          type="text"
          placeholder=""
          onChange={handleExternalLinkChange}
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
                  className="bg-[var(--white)] btn-border border-[var(--green)] rounded-lg upload-btn-bg-color px-10 py-3 my-2 mx-auto flex flex-center"
                  onClick={handleOnClick}
                >
                  Upload an Image
                </button>
              );
            }}
          </UploadWidget>

          {imageUrl && (
            <>
              <h3>Product Image</h3>
              <p>
                <img src={imageUrl} alt="Uploaded resource" />
              </p>
              <p>{imageUrl}</p>
            </>
          )}
          <button
            className="btn-border rounded-lg px-10 py-3 my-2 mx-auto flex flex-center btn-bg-color"
            type="submit"
          >
            Add Product
          </button>
          <button className="btn-border rounded-lg px-10 py-3 my-2 mx-auto flex flex-center cancel-btn-bg-color">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
