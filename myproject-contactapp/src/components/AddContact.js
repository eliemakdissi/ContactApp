import React from "react";
import { useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import { useFormik } from "formik";
import { schema } from "../schemas";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import "./App.css";

const cities = [
  "Beirut",
  "Tripoli",
  "Sidon",
  "Zahle",
  "Tyre",
  "Danniyeh",
  "Jounieh",
  "Baalbek",
  "Beqaa",
  "Akkar",
  "Aley",
  "Nabatieh",
  "Byblos",
  "Batroun",
  "Zgharta",
];

const AddContact = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { addContactHandler } = useContactsCrud();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      sex: "",
      city: "",
      image: "",
      firebasepath: "",
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      setIsLoading(true);
      const { url, path } = await uploadFile();
      addContactHandler({
        name: values.name,
        email: values.email,
        age: values.age,
        sex: values.sex,
        city: values.city,
        image: url,
        firebasepath: path,
      });
      actions.resetForm();
      setIsLoading(false);
      navigate("/");
    },
  });

  const uploadFile = async () => {
    if (imageUpload == null) {
      return;
    }
    const path = `images/${imageUpload.name + v4()}`;
    const imageRef = ref(storage, path);
    const snapshot = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(snapshot.ref);
    return { url, path };
  };

  return (
    <div
      className="ui main"
      style={{
        paddingTop: "50px",
      }}
    >
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label style={{ fontSize: "1.2em" }}>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name && touched.name ? "input-error" : ""}
          />
        </div>
        {errors.name && touched.name && <p className="error">{errors.name}</p>}

        <div className="field">
          <label style={{ fontSize: "1.2em" }}>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
          ></input>
        </div>
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}

        <div className="field">
          <label style={{ fontSize: "1.2em" }}>Age</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.age && touched.age ? "input-error" : ""}
          ></input>
        </div>
        {errors.age && touched.age && <p className="error">{errors.age}</p>}

        <div className="field">
          <label style={{ fontSize: "1.2em" }}>Sex</label>
          <div>
            <input
              type="radio"
              id="male"
              name="sex"
              value="Male"
              checked={values.sex === "Male"}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.sex && touched.sex ? "input-error" : ""}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="sex"
              value="Female"
              checked={values.sex === "Female"}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.sex && touched.sex ? "input-error" : ""}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        {errors.sex && touched.sex && <p className="error">{errors.sex}</p>}

        <div className="field">
          <label style={{ fontSize: "1.2em" }}>City</label>
          <select
            name="city"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.city && touched.city ? "input-error" : ""}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {errors.city && touched.city && <p className="error">{errors.city}</p>}

        <div className="field">
          <label style={{ fontSize: "1.2em" }}>Profile Picture</label>
          <input
            type="file"
            name="image"
            style={{ cursor: "pointer" }}
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
            required
          />
        </div>

        <button
          type="submit"
          className="ui button blue"
          disabled={isSubmitting}
        >
          Add
        </button>

        {isLoading && (
          <div
            className="ui active centered inline loader"
            style={{ marginTop: "20px" }}
          ></div>
        )}
      </form>
    </div>
  );
};
export default AddContact;
