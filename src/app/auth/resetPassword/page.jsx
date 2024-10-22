"use client";
import AuthenticationFooter from "@/shared/AuthenticationFooter/AuthenticationFooter";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import reset from "../../../../Public/icons/reset/reset.svg";
import Image from "next/image";
import axios from "axios";
import { useVerification } from "@/context/VerificationContext";
import BlackButton from "@/loaders/BlackButton/BlackButton";

const Page = () => {
  const route = useRouter();
  const { setVerificationCode } = useVerification();
  const [captchaError, setCaptchaError] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const generateRandomCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWX YZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  };
  const [captcha, setCaptcha] = useState(generateRandomCode());

  const distortCode = (code) => {
    const distortedCode = code
      .split("")
      .map((char) =>
        Math.random() > 0.5 ? char.toLowerCase() : char.toUpperCase()
      )
      .join("");
    return distortedCode;
  };

  const addNoise = (code) => {
    let noisyCode = "";
    for (let i = 0; i < code.length; i++) {
      noisyCode += code.charAt(i);
      if (Math.random() > 0.6) {
        noisyCode += " ";
      }
    }
    return noisyCode;
  };
  const regenerateCaptcha = () => {
    const newCode = generateRandomCode();
    const distortedCode = distortCode(newCode);
    const noisyCode = addNoise(distortedCode);
    setCaptcha(noisyCode);
  };
  const handleCaptchaChange = (e) => {
    const inputValue = e.target.value;
    setCaptchaInput(inputValue);
    if (inputValue === captcha) {
      setSuccessMessage("Captcha verified successfully.");
      setCaptchaError("");
    } else {
      setCaptchaError("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (captchaInput !== captcha) {
      setCaptchaError("Captcha verification failed.");
      setSuccessMessage("");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.target);

    try {setLoading(true);
      const response = await axios.post(
        "https://tarsuniverse.net:8443/auth/reset",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("response -", response);
      


      if (response.status === 200) {

           axios.defaults.headers.common[
             "Authorization"
           ] = `Bearer ${response?.data?.session}`;

        setTimeout(() => {
          route.push("/auth/resetPassword/otp");
        }, 2000);
        localStorage.setItem("session", response?.data?.session);
      

        setSuccessMessage("Email sent successfully.");
        setCaptchaError("");

        if (captchaInput === captcha) {
          console.log("navigate (verificationCode)");
        } else {
          setLoading(false);
          setCaptchaError("Captcha verification failed.");
          setSuccessMessage("");
          setLoading(false);
        }
      } else {

        setCaptchaError("Failed to send email");
        setSuccessMessage("");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setCaptchaError("Failed to send email.");
      setSuccessMessage("");
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <>
        <div className="flex items-center justify-center ">
          <form onSubmit={onSubmit}>
            {" "}
            <div className="flex flex-col items-center  gap-[3rem] px-4">
              <div className="flex flex-col items-center gap-2">
                {" "}
                <p className="text-subTitle text-center">Reset your Password</p>
                <p className="text-paragraph font-light lg:w-[22rem] md:px-0 px-8 text-center">
                  Enter your email address that you use with your account to
                  continue.
                </p>
              </div>

              <div className=" max-w-sm w-full">
                <div className="w-full flex flex-col items-start gap-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full shadow font-light text-miniTItle focus:outline-none px-3 h-10 rounded-md"
                    name="email"
                    id=""
                  />
                  <input
                    onChange={handleCaptchaChange}
                    value={captchaInput}
                    placeholder="Type the characters on the image"
                    className="w-full shadow font-light  text-paragraph focus:outline-none px-3 h-10 rounded-md"
                    name="recaptcha"
                    id=""
                  />
                </div>
                <p className="text-red-500 font-light text-xs">
                  {captchaError}
                </p>
                {successMessage && (
                  <p className="text-green-500 ml-3 mt-1 sf-pro-display text-xs font-light">
                    {successMessage}
                  </p>
                )}
              </div>

              <div className="flex gap-7 p-0 mx-auto items-center">
                <div className="h-[40px] w-[70px] lg:h-[45px] flex items-center justify-center lg:w-[110px]  bg-zinc-400 ">
                  <p className="pointer-events-none text-center captcha text-sm line-through">
                    {captcha}
                  </p>
                </div>
                <div className="  flex items-center mb-0">
                  <div className=" flex justify-evenly gap-2 flex-col mt-[0px] text-[#346ABB] items-start 2xl:text-[20px] text-[14px]">
                    <div
                      className="flex  gap-2  cursor-pointer"
                      onClick={regenerateCaptcha}
                    >
                      <Image
                        src={reset}
                        alt="refresh"
                        height={12}
                        width={12}
                        loading="lazy"
                      ></Image>

                      <p
                        className="text-[#346ABB]  text-paragraph sf-pro-display"
                        style={{ fontWeight: "400" }}
                      >
                        Resend
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8">
                <button
                  onClick={() => route.back()}
                  className="shadow rounded-lg  bg-white w-28 h-9 text-paragraph"
                >
                  Cancel
                </button>
                <button className="border rounded-lg text-gray-100 bg-base w-28 h-9 text-paragraph">
                  {loading ? <BlackButton /> : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <AuthenticationFooter />
      </>
    </div>
  );
};

export default Page;
