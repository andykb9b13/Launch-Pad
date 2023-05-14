import React, { useState } from "react";
import { QUERY_PRODUCT } from "../utils/queries";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import forms from "@tailwindcss/forms";
import { useMutation } from "@apollo/react-hooks";
import { ADD_DONATION } from "../utils/mutations";
import Auth from "../utils/auth";
import Stripe from "react-stripe-checkout";

const ProductCard = () => {
  const [total, setTotal] = useState(null);
  const [message, setMessage] = useState("")
  const [donate, { error }] = useMutation(ADD_DONATION);
  const { productId } = useParams();

  const { data, loading, error: queryError } = useQuery(QUERY_PRODUCT, {
    variables: {
      productId: productId,
    },
  });  
  if (loading) {
    console.log("ITS LOADING")
  }  
  if (queryError) {
    console.log("Sometheing went horribly wrong")
  }
  
  const product = data?.product || [];

  console.log(productId)

  const handleTotalChange = (e) => {
    setTotal(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }



  const handleToken = async(total, token) => {
    console.log("token: " + token);
    try {
      const response = await fetch("/api/stripe/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.id,
          amount: total,
        }),
      });

      console.log(response)

      if(response.ok){
        console.log("response is good")
        handleSubmit();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const tokenHandler = (token) => {
    handleToken(total, token);
  };
  
  //variables: 
  // _id
  // donor
  // amount
  // product
  // message
  const handleSubmit = async (event) => {
    console.log("amount:", total, "message:", message, "productId", productId)
    console.log(productId, "THIS IS PRODUCTID in handleSubmit");
    try {
      const { data } = await donate({
        variables: {
          amount: total, 
          message: message, 
          productId: productId, 
        },
      });
  
      // Handle the returned data as needed
      console.log('Donation successful:', data);
    } catch (error) {
      // Handle any errors that occur during the mutation
      console.error('Error during donation:', error);
    }
  };

  return (
    <div className="grid gap-4 place-content-center px-4 py-3 rounded-sm relative top-20">
      <div className="rounded-md outline outline-4 outline-[var(--lime)]">
        {/* <h2 className="font-semibold leading-7 text-[var(--red)] text-center border-b-4 border-[var(--green)] h-10 text-2xl">
          Funding Form
        </h2> */}
        <h3 className="text-center text-xl font-semibold">{product.name}</h3>
        <img src={product.imageUrl} alt={product.name} />
        <div className="progressBar text-center">
          <h3>How much is raised so far...</h3>
          <p className="progressAmt">${product.funding}</p>
        </div>
        <div className="text-center mt-6">
          <a
            href={product.externalLink}
            className="text-center basis=1/4 text-[var(--green)] font-bold rounded-full p-5"
          >
            Buy it now
          </a>
        </div>

        <form
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1"
          onSubmit={handleSubmit}
        >
          <div className="sm:col-span-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium leading-6 text-[var(--green)] ml-2"
              name="amount"
            >
              Enter amount you want to donate
            </label>
            <div className="mt-2 ml-2 mr-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                <input
                  onChange={handleTotalChange}
                  type="number"
                  name="amount"
                  id="amount"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ml-2"
                  placeholder="$500"
                ></input>
              </div>
            </div>

            <label
              htmlFor="message"
              className="block text-sm font-medium leading-6 text-[var(--green)] ml-2"
            >
              Write a message
            </label>
            <div className="mt-2 ml-2 mr-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                <textarea
                  onChange={handleMessageChange}
                  type="text"
                  name="message"
                  id="message"
                  rows="3"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Your message here..."
                ></textarea>
              </div>
            </div>
            <div id="stripe-button" onClick={(e) => {
              e.preventDefault()
            }}>
                <Stripe
                  className="ml-2 inline-block rounded bg-[var(--red)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[var(--white)] shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] relative top-2"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  stripeKey="pk_test_51N6iz9AqOUdA7AoG2XmQujEgl4vktvigfdoVOeIHUOdHYKrbZJiHzcdUA6HVp0SrY8IsN6WlaYh247mX0sXihXKz008JQffNTH"
                  token={tokenHandler}
                />
             </div>
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
        </form>
      </div>
    </div>
  );
};

export default ProductCard;
