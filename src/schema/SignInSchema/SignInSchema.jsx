import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /@(gmail|yahoo|icloud|outlook|.+)\.com$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default SignInSchema;
