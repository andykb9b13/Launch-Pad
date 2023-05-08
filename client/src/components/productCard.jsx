import React from "react";
import { QUERY_PRODUCT } from "../utils/queries";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import forms from "@tailwindcss/forms";

const ProductCard = () => {
  const { productId } = useParams();
  console.log("productId", productId);

  const { data } = useQuery(QUERY_PRODUCT, {
    variables: {
      productId: productId,
    },
  });

  console.log("data from productId", data);
  const product = data?.product || [];

  return (
    <div className="px-4 py-3 rounded-full relative top-20">
      <h2 className="text-base font-semibold leading-7 text-[var(--red)]">
        Funding Form
      </h2>
      <h3>{product.name}</h3>
      <img src="" alt="product" />
      <div className="progressBar">
        <h3>How much is raised so far...</h3>
        <p className="progressAmt">${product.funding}</p>
      </div>
      <a href={product.externalLink}>Buy it now</a>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
        <div className="sm:col-span-4">
          <label
            htmlFor="donateAmt"
            className="block text-sm font-medium leading-6 text-[var(--green)]"
          >
            Enter amount you want to donate
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="$500"
              ></input>
            </div>
          </div>

          <label
            htmlFor="message"
            className="block text-sm font-medium leading-6 text-[var(--green)]"
          >
            Write a message
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
              <input
                type="text"
                name="message"
                id="message"
                rows="3"
                autocomplete="message"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Your message here..."
              ></input>
            </div>
          </div>
          <button
            type="button"
            className="inline-block rounded bg-[var(--red)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[var(--white)] shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] relative top-2"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Donate
          </button>
        </div>
        {/* check these links, they are placeholders on 5/3 */}
        <div className="flex flex-row justify-center">
          <Link
            to="/signup"
            className="basis=1/4 text-[var(--green)] font-bold rounded-full p-5"
          >
            Sign in to donate
          </Link>
          <Link
            to="/business"
            className="basis=1/4 text-[var(--green)] font-bold rounded-full p-5"
          >
            Back to Business
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
