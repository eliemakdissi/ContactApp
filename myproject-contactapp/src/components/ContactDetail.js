import React from "react";
import { Link, useLocation } from "react-router-dom";

const ContactDetail = () => {
  const location = useLocation();
  const { _id, name, email, age, sex, city, image } = location.state.contact;

  return (
    <div
      className="main"
      style={{
        marginTop: "70px",
      }}
    >
      <div className="ui card centered">
        <div className="image">
          <a href={image} target="_blank" rel="noopener noreferrer">
            <img
              src={image}
              alt="user"
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </a>
        </div>
        <div className="content" style={{ textAlign: "center" }}>
          <div className="header">{name}</div>
          <div className="description">
            <div>{email}</div>
            <div>{age}</div>
            <div>{sex}</div>
            <div>{city}</div>
            <div>{_id}</div>
          </div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
