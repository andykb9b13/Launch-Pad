import React from "react";
import AddProduct from "./AddProduct";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_BUSINESS } from "../utils/queries";
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import twitter from "../assets/icons/twitter.png";
import { DELETE_BUSINESS } from "../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import "../styles/business.css";

const Business = ({ business }) => {
  const { data } = useQuery(QUERY_BUSINESS, {
    variables: {
      name: business.name,
    },
  });
  const myBusiness = data?.business || [];
  console.log("This is myBusiness", myBusiness);

  const handleDelete = async () => {
    console.log("business id: ", data?.business._id);
    const businessId = data?.business._id;
    try {
      await deleteBusiness({
        variables: { id: businessId },
      });
      alert("Business deleted!");
    } catch (err) {
      console.log("catch block");
      console.error(err);
      alert("Unsuccessful delete. Please try again.");
    }
  };
  const [deleteBusiness, { error }] = useMutation(DELETE_BUSINESS);

  return (
    <div className="businessContainer">
      <h3 className="businessName">{myBusiness.name}</h3>
      <img
        src={myBusiness.imageUrl}
        alt={business.name}
        className="businessProfileImg"
      />
      <h3 className="location">{myBusiness.location}</h3>
      <p className="description">{myBusiness.description}</p>
      <div className="businessMissionStatement">
        <h2>Mission Statement</h2>
        <p>{myBusiness.missionStatement}</p>
      </div>

      <div className="socialIcons">
        <a href={myBusiness.twitter}>
          <img src={twitter} alt="twitter" />
        </a>
        <a href={myBusiness.facebook}>
          <img src={facebook} alt="facebook" />
        </a>
        <a href={myBusiness.instagram}>
          <img src={instagram} alt="instagram" />
        </a>
      </div>
      <Link to={`/`}>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-[var(--red)] text-[var(--white)] font-bold py-2 px-4 my-2 rounded item-margin-biz"
        >
          Delete Business Profile
        </button>
      </Link>
      <div className="outer-div-for-products">
        <div className="productContainer">
          {myBusiness.products &&
            myBusiness.products.map((product, i) => (
              <div key={i} className="product product-inner-container">
                <div className="innerProduct">
                  <img src={product.imageUrl} alt={product.name} />
                  <h2>{product.name}</h2>
                  <p>${product.funding}</p>
                  <p>{product.description}</p>
                  <button type="button" className="fundBtn">
                    <Link to={`/product/${product._id}`} product={product}>
                      Fund This Item!
                    </Link>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2>Add a Product To Be Funded</h2>
        <AddProduct business={business} />
      </div>
    </div>
  );
};

export default Business;
