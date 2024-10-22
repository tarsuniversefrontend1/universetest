import axios from "axios";
import * as Yup from "yup";

export const GeneralInfoSchema = () => {
  const checkSpelling = async (text) => {
    const response = await fetch(
      `https://serpapi.com/search.json?q=${encodeURIComponent(
        text
      )}&hl=en&gl=us&api_key=your_api_key`
    );
    const data = await response.json();
    return data.search_information && data.search_information.spelling_fix
      ? data.search_information.spelling_fix
      : null; 
  };
const checkUsernameAvailability = async (username) => {
  try {
    console.log("Checking username availability for:", username);
    const response = await axios.get(
      `https://tarsuniverse.net:8443/api/check-username?username=${username}`
    );
    console.log("Username availability response:", response.data);
    return response.data.available;
  } catch (error) {
    console.error("Error checking username availability:", error.message);
    return false;
  }
};

  const checkEmailAvailability = async (email) => {
    const response = await fetch(
      `https://tarsuniverse.net:8443/api/check-email?email=${email}`
    );
    const data = await response.json();
    return data.available; 
  };

  const checkPhoneAvailability = async (phone) => {
    const response = await fetch(
      `https://tarsuniverse.net:8443/api/check-phone?phone=${phone}`
    );
    const data = await response.json();
    return data.available; 
  };

  // Validation schema
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z]*$/,
        "First name must start with a capital letter"
      )
      .max(12, "First name must be 12 characters or less")
      .nullable(),

    lastname: Yup.string()
      .matches(/^[A-Z][a-zA-Z]*$/, "Last name must start with a capital letter")
      .max(12, "Last name must be 12 characters or less")
      .required("Last name is required")
      .nullable(),

    username: Yup.string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be 20 characters or less")
      .matches(/^\S*$/, "Username cannot contain spaces")

      .test(
        "checkUsernameAvailability",
        "Username is already taken",
        async function (value) {
          if (!value) return true;
          const isAvailable = await checkUsernameAvailability(value);
          return isAvailable;
        }
      )
      .nullable(),

    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[A-Za-z0-9._%+-]+@(gmail\.com|outlook\.com|icloud\.com|yahoo\.com)$/,
        "Invalid account address"
      )
      .required("Account is required")
      .test(
        "checkEmailAvailability",
        "Email is already taken",
        async function (value) {
          if (!value) return true;
          return await checkEmailAvailability(value);
        }
      )
      .nullable(),

    phone: Yup.string()
      .matches(
        /^\+?\d{10,15}$/,
        "Phone number must be a valid international phone number"
      )
      .test(
        "checkPhoneAvailability",
        "Phone number is already taken",
        async function (value) {
          if (!value) return true;
          return await checkPhoneAvailability(value);
        }
      )
      .nullable(),

    legalDoc: Yup.mixed()
      .test(
        "fileSize",
        "File size is too large",
        (value) => !value || (value && value.size <= 6 * 1024 * 1024)
      ) // 6MB
      .test(
        "fileType",
        "Unsupported file format (PDF)",
        (value) => !value || (value && value.type === "application/pdf")
      )
      .nullable(),

    bio: Yup.string()
      .max(500, "Bio must be 500 characters or less")
      .test(
        "noOffensiveLanguage",
        "Bio should not contain offensive language",
        (value) => {
          return true;
        }
      )
      .test(
        "minLength",
        "Bio must be at least 10 characters long",
        (value) => !value || (value && value.trim().length >= 10)
      )
      .test(
        "checkSpelling",
        "There are spelling errors in your bio",
        async function (value) {
          if (!value) return true;
          const typo = await checkSpelling(value);
          return !typo;
        }
      )
      .nullable(),

    dateOfBirth: Yup.date()
      .max(new Date(), "Birth date cannot be in the future")
      .nullable(),

    from: Yup.string()
      .max(100, "Location must be 100 characters or less")
      .nullable(),

    lives_in: Yup.string()
      .max(100, "Location must be 100 characters or less")
      .nullable(),

    current_institution: Yup.string()
      .matches(/^[A-Z]/, "Institution must start with a capital letter")
      .matches(/^[A-Za-z\s]*$/, "Institution must contain no numbers")
      .matches(
        /^[^!@#$%^&*(),.?":{}|<>]*$/,
        "Institution must contain no special characters"
      )
      .nullable(),

    current_department: Yup.string()
      .matches(
        /^[A-Z]{2,5}$/,
        "Department must be an abbreviation with 2 to 5 uppercase letters"
      )
      .matches(/^[^0-9]*$/, "Department must contain no numbers")
      .matches(
        /^[^!@#$%^&*(),.?":{}|<>]*$/,
        "Department must contain no special characters"
      )
      .nullable(),

    enrollment_date: Yup.string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must follow the YYYY-MM-DD format")
      .matches(/^[^A-Za-z]*$/, "Date must contain no letters")
      .matches(
        /^[^!@#$%^&*(),.?":{}|<>]*$/,
        "Date must contain no special characters"
      )
      .nullable(),

    course_timeline_months: Yup.string()
      .matches(/^\d+$/, "must be a number")
      .nullable(),

    last_institution: Yup.string()
      .matches(/^[A-Z]/, " must start with capital letter")
      .matches(/^[A-Za-z\s]*$/, "no numbers")
      .matches(
        /^[^!@#$%^&*(),.?":{}|<>]*$/,
        "no special characters"
      )
      .nullable(),

    last_department: Yup.string()
      .matches(
        /^[A-Z]{2,5}$/,
        "Department must be an abbreviation "
      )
      .matches(/^[^0-9]*$/, "no numbers")
      .matches(
        /^[^!@#$%^&*(),.?":{}|<>]*$/,
        "no special characters"
      )
      .nullable(),

    last_grade: Yup.string()
      .matches(/^[0-5]$/, "Give valid grade")
      .matches(
        /^\d\.\d{2}$/,
        "(e.g., 3.56, 4.59)"
      )
      .nullable(),
  });

  return validationSchema; 
};
