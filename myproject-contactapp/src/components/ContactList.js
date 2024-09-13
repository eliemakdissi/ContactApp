import React, { useEffect } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContactList = () => {
  const {
    contacts,
    retrieveContacts,
    searchTerm,
    searchResults,
    searchHandler,
  } = useContactsCrud();

  useEffect(() => {
    retrieveContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContactList = (
    searchTerm.length < 1 ? contacts : searchResults
  ).map((contact) => {
    return <ContactCard contact={contact} key={contact._id} />;
  });

  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <div
      className="ui main"
      style={{
        paddingTop: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Contact List</h2>
        <Link to="/add">
          <button className="ui button blue">Add Contact</button>
        </Link>
      </div>
      <div className="ui search">
        <div className="ui icon input">
          <input
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={searchTerm}
            onChange={(e) => onUserSearch(e)}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list"> {renderContactList} </div>
    </div>
  );
};

export default ContactList;
