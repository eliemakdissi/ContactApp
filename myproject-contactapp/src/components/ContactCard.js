import React from "react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContactCard = (props) => {
  const { removeContactHandler } = useContactsCrud();

  const { _id, name, email, age, sex, city, image, firebasepath } =
    props.contact;

  const deleteContact = (_id, firebasepath) => {
    removeContactHandler(_id, firebasepath);
  };

  return (
    <div
      className="item"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        marginBottom: "10px",
      }}
    >
      <Link to={`/contact/${_id}`} state={{ contact: props.contact }}>
        <img className="ui avatar image" src={image} alt="user" />
      </Link>
      <div
        className="content"
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        <Link to={`/contact/${_id}`} state={{ contact: props.contact }}>
          <div
            style={{ width: "10px", textAlign: "center", marginLeft: "20px" }}
          >
            {name}
          </div>
        </Link>
        <div style={{ width: "40px", textAlign: "center" }}>{email}</div>
        <div style={{ width: "10px", textAlign: "center" }}>{age}</div>
        <div style={{ width: "10px", textAlign: "center" }}>{sex}</div>
        <div
          style={{ width: "10px", textAlign: "center", marginRight: "150px" }}
        >
          {city}
        </div>
      </div>

      <Link to={`/contacts/${_id}`} state={{ contact: props.contact }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "green" }}
        ></i>
      </Link>

      <i
        className="trash alternate outline icon right floated"
        style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
        onClick={() => deleteContact(_id, firebasepath)}
      ></i>
    </div>
  );
};

export default ContactCard;
