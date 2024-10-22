"use client"
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import BlackButton from "@/loaders/BlackButton/BlackButton";

const Page = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const route = useRouter();
  const [submitLoader, setSubmitLoader] = useState(false);

  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(120);
  const [otpSent, setOtpSent] = useState(false);
  const [inputError, setInputError] = useState("");
  const [message, setMessage] = useState("");
  const [otpExpired, setOtpExpired] = useState(false);

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
    setLoading(true);
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value.length === 1 && index < 3) {
        inputRefs[index + 1].current.focus();
      }

      if (newOtp.every((val) => val !== "")) {
        const userInputOtp = newOtp.join("");
        if (Number(userInputOtp) === verificationCode) {
          setLoading(true);
          console.log("OTP entered:", userInputOtp);
          route.push("/auth/resetPassword/passwordRecovery");
        } else {
          setLoading(false);
          console.error("Incorrect OTP entered");
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !inputRefs[index].current.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const sendEmailOTP = useCallback(async () => {
    if (otpSent) return;

    setSubmitLoader(true);
    try {
      const response = await axios.get(
        "https://tarsuniverse.net:8443/auth/emailcode",
        {
          withCredentials: true,
        }
      );
      setEmail(response.data.email_masked);
      setVerificationCode(response.data.verification_code);
      console.log(response.data);
      setOtpSent(true); // Set OTP sent state to true
      setInputError("");
    } catch (error) {
      console.error("Error sending email OTP:", error);
      setInputError("Error sending email OTP.");
    } finally {
      setSubmitLoader(false);
    }
  }, [otpSent]);

  useEffect(() => {
    sendEmailOTP();
  }, [sendEmailOTP]);

  const resendCode = async () => {
    setMessage("Code Resent");
    setTime(120);
    setInputError("");
    setOtpSent(false);
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col items-center gap-[3rem] px-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-subTitle text-center">Verify Your Email</p>
            <p className="text-paragraph font-light text-center flex items-center gap-2">
              Enter the code sent to{" "}
              {submitLoader ? (
                <p className="font-bold animate-pulse">...</p>
              ) : (
                email
              )}
            </p>
          </div>

          <div>
            <div className="flex lg:gap-20">
              <div className="flex gap-3 2xl:gap-5 mx-auto">
                {inputRefs?.map((ref, index) => (
                  <input
                    key={index}
                    type="text"
                    name="verificationCode"
                    maxLength="1"
                    placeholder=""
                    pattern="[0-9]"
                    className="focus:outline-none xl:text-2xl text-center lg:w-[55px] lg:h-[52px] 2xl:h-[65px] 2xl:w-[65px] w-[47px] h-[47px] shadow rounded-lg px-3 py-3 block"
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={ref}
                    required
                  />
                ))}
              </div>
            </div>
            {message && (
              <p className="text-green-700 text-xs mt-1">{message}</p>
            )}
            {inputError && (
              <p className="text-red-700 text-xs mt-1">{inputError}</p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <p className={`text-paragraph ${time === 0 ? "text-red-700" : ""}`}>
              Enter your code ({formatTime(time)})
            </p>
            <p className="text-paragraph text-gray-400">
              Didn&apos;t receive the code?{" "}
              <span
                onClick={resendCode}
                className="text-blue-800 cursor-pointer"
              >
                Resend
              </span>
            </p>
          </div>
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={() => route.back()}
              className="shadow rounded-lg bg-white w-28 h-9 text-paragraph"
            >
              Cancel
            </button>
            <button className="border rounded-lg text-gray-100 bg-base w-28 h-9 text-paragraph">
              {submitLoader ? <BlackButton /> : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
