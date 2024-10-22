"use client";
// auth/signUp/otp/page.jsx
import AuthenticationFooter from "@/shared/AuthenticationFooter/AuthenticationFooter";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Correct import for useRouter
import { useVerification } from "@/context/VerificationContext";
import axios from "axios";
import BlackButton from "@/loaders/BlackButton/BlackButton";

const Page = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [submitLoader, setSubmitLoader] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const route = useRouter();
  const { verificationCode } = useVerification();
  console.log("Verification Code from Sign-Up:", verificationCode);

  const [time, setTime] = useState(120);
  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleInputChange = (index, value) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value.length === 1 && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !inputRefs[index].current.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const onSubmit = async (e) => {
    setSubmitLoader(true);
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log(parseInt(enteredOtp));

    if (parseInt(enteredOtp) === parseInt(verificationCode)) {
      console.log(
        "Entered OTP matches verification code:",
        parseInt(enteredOtp)
      );
      const axiosConfig = { withCredentials: true };
      console.log(
        "Axios config withCredentials:",
        axiosConfig?.withCredentials
      );

      try {
        setSubmitLoader(true);
        const response = await axios.get(
          "https://tarsuniverse.net:8443/auth/verify",
          axiosConfig,
          {
            withCredentials: true,
          }
        );

        console.log("GET request response:", response);

        
          setSubmitLoader(false);
          route.push("/auth/signUp/success");
          const session = localStorage.getItem("session");
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${session}`;
      
      } catch (error) {
        setSubmitLoader(false);
        console.error("Error fetching data:", error);
        setMessage("Something went wrong");
        setInputError(true);
      }
    } else {
      setSubmitLoader(false);
      setMessage("Invalid verification code");
      setInputError(true);
    }
  };


   const resendCode = async () => {
     setMessage("Code Resent");
     setTime(120);
     setInputError("");
     setOtpSent(false);
   };

  return (
    <form onSubmit={onSubmit}>
      <div className="">
        <div className="flex flex-col items-center  gap-[3rem] px-4">
          <div className="flex flex-col items-center gap-2">
            {" "}
            <p className="text-subTitle text-center">Verify Your Email</p>
            <p className="text-paragraph font-light">Enter the code sent to</p>
          </div>

          <div className="flex lg:gap-20">
            <div className="flex flex-col items-start gap-2">
              <div className="flex gap-3 relative 2xl:gap-5 mx-auto">
                {inputRefs?.map((ref, index) => (
                  <input
                    key={index}
                    type="text"
                    name="verificationCode"
                    maxLength="1"
                    placeholder=""
                    pattern="[0-9]"
                    className={`focus:outline-none xl:text-2xl text-center lg:w-[55px] lg:h-[52px] 2xl:h-[65px] 2xl:w-[65px] w-[47px] h-[47px] shadow bg-white rounded-lg px-3 py-3 block ${
                      inputError ? "border-red-600 border" : ""
                    }`}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={ref}
                    required
                  />
                ))}
              </div>
              <p className="text-green-600  text-xs font-light">
                {message}
              </p>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col justify-center items-center gap-1">
            <p className={`text-paragraph ${time === 0 ? "text-red-700" : ""}`}>
              Enter your code ({formatTime(time)})
            </p>
            <p className="text-paragraph text-gray-400">
              Didn&apos;t receive the code?{" "}
              <span className="text-blue-800 cursor-pointer" onClick={resendCode}>Resend</span>{" "}
            </p>
          </div>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => route.back()}
              className=" rounded-lg shadow bg-white w-28 h-9 text-paragraph"
            >
              Cancel
            </button>
            <button className="border rounded-lg text-gray-100 bg-base w-28 h-9 text-paragraph">
              {submitLoader ? <BlackButton /> : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Page;
