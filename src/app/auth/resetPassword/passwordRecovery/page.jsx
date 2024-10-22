"use client";
import BlackButton from "@/loaders/BlackButton/BlackButton";
import PasswordRecoverSchema from "@/schema/PasswordRecoverSchema/PasswordRecoverSchema";
import AuthenticationFooter from "@/shared/AuthenticationFooter/AuthenticationFooter";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitLoader, setSubmitLoader] = useState(false);
  const route = useRouter();

  // Validate in real-time as the user types
  const handleInputChange = (e, field) => {
    if (field === "password") {
      setPassword(e.target.value);
    } else if (field === "retypePassword") {
      setRetypePassword(e.target.value);
    }

    // Re-validate as the user types
    const validationErrors = PasswordRecoverSchema(
      field === "password" ? e.target.value : password,
      field === "retypePassword" ? e.target.value : retypePassword
    );

    setErrors(validationErrors);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = PasswordRecoverSchema(password, retypePassword);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear any previous errors
    setSubmitLoader(true); // Show loader

    try {
      const response = await axios.post(
        "https://tarsuniverse.net:8443/auth/passrecovery",
        { password, retypePassword },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      route.push("/auth/resetPassword/success");
    } catch (error) {
      console.error("Error submitting password recovery:", error);
      setErrors({ submit: "Failed to reset password. Please try again." });
    } finally {
      setSubmitLoader(false); // Hide loader
    }
  };

  // Show only the first error in the errors object
  const displayFirstError = () => {
    if (errors.length) return errors.length;
    if (errors.capital) return errors.capital;
    if (errors.number) return errors.number;
    if (errors.special) return errors.special;
    if (errors.match) return errors.match;
    if (errors.submit) return errors.submit;
    return null;
  };

  return (
    <div>
      <div className="">
        <div className="flex flex-col items-center gap-[3rem] px-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-subTitle text-center">Password Recovery</p>
            <p className="text-paragraph font-light lg:w-[22rem] text-center">
              Enter your new password to continue.
            </p>
          </div>

          <div className="max-w-sm w-full">
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-start gap-3"
            >
              <input
                type="password"
                placeholder="Password"
                className="w-full shadow focus:outline-none px-3 h-10 rounded-md"
                value={password}
                onChange={(e) => handleInputChange(e, "password")}
                required
              />
              <input
                type="password"
                placeholder="Retype Password"
                className="w-full shadow focus:outline-none px-3 h-10 rounded-md"
                value={retypePassword}
                onChange={(e) => handleInputChange(e, "retypePassword")}
                required
              />

              {/* Displaying only the first error */}
              {displayFirstError() && (
                <div className="text-red-600 text-xs ">
                  <p>{displayFirstError()}</p>
                </div>
              )}

              <div className="flex items-center w-full justify-center gap-8 mt-4">
                <button
                  type="button"
                  onClick={() => route.back()}
                  className="shadow rounded-lg bg-white w-28 h-9 text-paragraph"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border rounded-lg text-gray-100 bg-base w-28 h-9 text-paragraph"
                  disabled={submitLoader}
                >
                  {submitLoader ? <BlackButton /> : "Continue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
