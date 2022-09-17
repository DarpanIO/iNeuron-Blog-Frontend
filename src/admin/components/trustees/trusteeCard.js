import React, { useState, useContext, useRef } from "react";
import aboutContext from "../../../context/aboutUs/aboutContext";
import "./trusteeCard.css";
const TrusteeCard = (props) => {
  const [trustee, setTrustee] = useState(props.Trustee);
  const refClose = useRef(null);

  return (
    <div className="trustee-card p-4 m-2">
      {trustee.photo && (
        <div className="trustee-photo">
          <img src={trustee.photo.images[0].location} alt="" />
        </div>
      )}
      <div className="trustee-name my-1">{trustee.name}</div>
      <div className="trustee-position my-1">{trustee.position}</div>
      <div className="trustee-description my-1">{trustee.description}</div>
      <div className="trustee-card-buttons d-flex my-1">
        <button
          className=""
          onClick={() => {
            props.updateTrustee(trustee);
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/otherIcons/pen.svg"}
            alt="Edit"
          />
        </button>
        <button
          className=""
          onClick={() => {
            props.deleteTrustee(trustee);
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/otherIcons/delete.svg"}
            alt="delete"
          />
        </button>
      </div>
    </div>
  );
};

export default TrusteeCard;
