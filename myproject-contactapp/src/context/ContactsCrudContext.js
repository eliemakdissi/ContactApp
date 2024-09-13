import React, { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    const response = await api.get("/users");
    if (response.data) setContacts(response.data);
  };

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = { ...contact };
    const response = await api.post("/users", request);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  const removeContactHandler = async (_id, firebasepath) => {
    if (firebasepath) {
      const imageRef = ref(storage, firebasepath);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error("Failed to delete image: ", error);
      }
    }
    await api.delete(`/users/${_id}`);
    const newContactList = contacts.filter((contact) => {
      return contact._id !== _id;
    });
    setContacts(newContactList);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/users/${contact._id}`, contact);
    const { _id } = response.data;

    setContacts(
      contacts.map((contact) => {
        return contact._id === _id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm1) => {
    setSearchTerm(searchTerm1);
    if (searchTerm1 !== "") {
      const newContactList = contacts.filter((contact) => {
        let contactCopy = { ...contact };
        delete contactCopy._id;
        delete contactCopy.image;
        delete contactCopy.firebasepath;
        delete contactCopy.createdAt;
        delete contactCopy.updatedAt;
        delete contactCopy.__v;

        return Object.values(contactCopy)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm1.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const value = {
    contacts,
    retrieveContacts,
    addContactHandler,
    removeContactHandler,
    updateContactHandler,
    searchTerm,
    searchResults,
    searchHandler,
  };
  return (
    <contactsCrudContext.Provider value={value}>
      {children}
    </contactsCrudContext.Provider>
  );
}

export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
