import axios from "axios";
import * as Yup from "yup";

const checkUsernameAvailability = async (username) => {
  try {
    const response = await axios.get(
      `https://tarsuniverse.net:8443/auth/api/check-username?username=${username}`
    );
    return response.data.available;
  } catch (error) {
    console.error("Error checking username availability:", error.message);
    return false;
  }
};
const checkemailAvailability = async (email) => {
  try {
    const response = await axios.get(
      `https://tarsuniverse.net:8443/auth/api/check-email?email=${email}`
    );
    return response.data.available;
  } catch (error) {
    console.error("Error checking email availability:", error.message);
    return false;
  }
};
const checkphoneAvailability = async (phone) => {
  try {
    const response = await axios.get(
      `https://tarsuniverse.net:8443/auth/api/check-phone?phone=${phone}`
    );
    return response.data.available;
  } catch (error) {
    console.error("Error checking Phone availability:", error.message);
    return false;
  }
};

const RegisterSchema = Yup.object({
  firstname: Yup.string()
    .matches(/^[A-Z][a-zA-Z]*$/, "First name must start with a capital letter ")
    .max(12, "First name must be 12 characters or less")
    .required("First name is required"),
  lastname: Yup.string()
    .matches(/^[A-Z][a-zA-Z]*$/, "Last name must start with a capital letter ")
    .max(12, "Last name must be 12 characters or less")
    .required("Last name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be 20 characters or less")
    .matches(/^\S*$/, "Username cannot contain spaces")
    .required("Username is required")
    .test(
      "checkUsernameAvailability",
      "Username is already taken",
      async function (value) {
        if (!value) return true;
        const isAvailable = await checkUsernameAvailability(value);
        return isAvailable;
      }
    ),

  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[A-Za-z0-9._%+-]+@(gmail\.com|outlook\.com|icloud\.com|yahoo\.com)$/,
      "Invalid Account address"
    )
    .required("Account is required")
    .test(
      "checkemailAvailability",
      "email is already taken",
      async function (value) {
        if (!value) return true;
        const isAvailable = await checkemailAvailability(value);
        return isAvailable;
      }
    ),

  phone: Yup.string()
    .matches(
      /^\+?\d{10,15}$/,
      "Phone number must be a valid international phone number"
    )
    .required("Phone number is required")
    .test(
      "checkphoneAvailability",
      "Phone Number is already taken",
      async function (value) {
        if (!value) return true;
        const isAvailable = await checkphoneAvailability(value);
        return isAvailable;
      }
    ),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  legalDoc: Yup.mixed()
    .required("Legal identity document is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || (value && value.size <= 6 * 1024 * 1024) // 6MB
    )
    .test(
      "fileType",
      "Unsupported file format(PDF)",
      (value) => !value || (value && value.type === "application/pdf")
    ),
  termsAccepted: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

export default RegisterSchema;
