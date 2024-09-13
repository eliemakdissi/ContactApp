import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string("Please enter a valid name").required("Required"),
  email: yup
    .string("Please enter a valid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    )
    .required("Required"),
  age: yup
    .number("Please enter a valid age")
    .positive("Please enter a valid age")
    .integer("Please enter a valid age")
    .required("Required"),
  sex: yup.string("Please enter a valid sex").required("Required"),
  city: yup.string("Please enter a valid city").required("Required"),
});
