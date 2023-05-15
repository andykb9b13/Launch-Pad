import React, { useEffect, useState } from "react";
import { QUERY_PRODUCT } from "../utils/queries";
import { Link } from "react-router-dom";
import { useQuery, useApolloClient } from "@apollo/client";
import { useParams } from "react-router-dom";
import forms from "@tailwindcss/forms";
import { useMutation } from "@apollo/react-hooks";
import { ADD_DONATION } from "../utils/mutations";
import Auth from "../utils/auth";
import Stripe from "react-stripe-checkout";
import CircularProgressBar from "../components/ProgressBar";
import "../styles/productCard.css";
import Confetti from 'react-confetti'

const ProductCard = () => {
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");
  const [donate, { error }] = useMutation(ADD_DONATION);
  const [product, setProduct] = useState([]);
  const [productFunding, setProductFunding] = useState(0);
  const [confettiCompleted, setConfettiCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const { productId } = useParams();

  const handleTotalChange = (e) => {
    const newTotal = parseInt(e.target.value);
    setTotal(newTotal);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false)
  };

  const { data } = useQuery(QUERY_PRODUCT, {
    variables: {
      productId: productId,
    },
  });
  console.log(productId)

  const renderConfetti = () => {
    setShowConfetti(true)
  }

  const handleToken = async (total, token) => {
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
      if (response.ok) {
        setProductFunding(productFunding + total);
        handleSubmit();
        renderConfetti();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const tokenHandler = (token) => {
    handleToken(total, token);
  };

  const getProduct = () => {
    const product = data?.product || [];
    setProduct(product);
    setProductFunding(product.funding);
  };

  useEffect(() => {
    getProduct();
  }, [data]);

  useEffect(() => {}, [productFunding]);
  useEffect(() => {
    if (showConfetti && confettiCompleted) {
      setShowConfetti(false);
    }
  }, [showConfetti, confettiCompleted]);

  const handleSubmit = async (event) => {
    try {
      const { data } = await donate({
        variables: {
          message: message,
          productId: productId,
          amount: parseInt(total),
        },
      });
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <div>
      {showConfetti && <Confetti height={10000} onConfettiComplete={{handleConfettiComplete}}/>}
      <div className="productInfo">
        {/* <h2 className="font-semibold leading-7 text-[var(--red)] text-center border-b-4 border-[var(--green)] h-10 text-2xl">
          Funding Form
        </h2> */}
        <h2>{product.name}</h2>
        <img className="productImg" src={product.imageUrl} alt={product.name} />
        <div className="progressBar text-center">
          <h3>How much is raised so far...</h3>
          <CircularProgressBar
            funding={productFunding}
            fundingGoal={product.fundingGoal}
          />
          <p className="progressAmt">
            ${productFunding}/${product.fundingGoal}
          </p>
        </div>
        <div className="text-center mt-6">
          <button className="navigateBtn">
            <a
              href={product.externalLink}
              className="text-center basis=1/4 text-[var(--green)] font-bold rounded-full p-5"
            >
              Buy it now
            </a>
          </button>
        </div>

        <form className="donateForm" onSubmit={handleSubmit}>
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
                  value={total}
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
            <div
              id="stripe-button"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
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
            <button className="navigateBtn">
              <Link
                to="/signup"
                className="basis=1/4 text-[var(--green)] font-bold rounded-full p-5"
              >
                Sign in to donate
              </Link>
            </button>
            <button className="navigateBtn">
              <Link
                to="/business"
                className="basis=1/4 text-[var(--green)] font-bold rounded-full p-5"
              >
                Back to Business
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCard;
