import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_PRODUCT } from "../utils/mutations";
import UploadWidget from "./UploadWidget";

export default function AddProduct({ business }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productFunding, setProductFunding] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  console.log("business in Add Product", business);

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
      funding: productFunding,
      externalLink: externalLink,
      imageUrl: imageUrl,
      businessId: business._id,
    };
    console.log("productInfo", productInfo);
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
    } catch (err) {
      console.error(err);
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

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Description
        </label>
        <input
          type="text"
          placeholder=""
          onChange={handleProductDescriptionChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

        <label className="text-[var(--red)] tracking-wider sm:text-2xl">
          Funding Needed
        </label>
        <input
          type="text"
          placeholder=""
          onChange={handleProductFundingChange}
          className="bg-[var(--white)] my-2 text-[gray] p-2 border-2 rounded-lg border-[var(--green)] ml-2"
        />

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
              <h3>Product Image</h3>
              <p>
                <img src={imageUrl} alt="Uploaded resource" />
              </p>
              <p>{imageUrl}</p>
            </>
          )}
          <button
            className="border-2 rounded-lg px-10 py-3 my-2 mx-auto flex flex-center"
            type="submit"
          >
            Next
          </button>
          <button className="border-2 rounded-lg px-10 py-3 my-2 mx-auto flex flex-center">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
