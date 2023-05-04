import React from "react";

const BusinessCard = ({ businesses }) => {
  return (
    <div className="business-cards">
      {businesses.map((business) => (
        <div className="business-card">
          <div className="business-header">
            <h2>{business.name}</h2>
          </div>
          <div className="business-content">
            <img src={business.imageUrl} alt="business-profile-pic" />
            <p>{business.description}</p>
          </div>
          <button type="button">Click to Launch</button>
        </div>
      ))}
    </div>
  );
};

export default BusinessCard;
