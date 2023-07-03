import * as yup from "yup";

const phonenumberRegex = /^\d{10}$/;
const surveySchema = yup.object().shape({
  shortResponse: yup
    .string()
    .required("Please enter a response")
    .max(200, "Response is too long"),
  paragraph: yup
    .string()
    .required("Please enter a response")
    .max(500, "Response is too long"),
  phoneNumber: yup
    .matches(phonenumberRegex, "Please enter a valid phone number")
    .required("Please enter a phone number"),
});

export default surveySchema;
