"use client";
// signUp -> page.jsx
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import arrow from "../../../../assets/icons/register/arrow.svg";
import Question from "../../../../assets/icons/register/Question.svg";
import upload from "../../../../assets/icons/register/upload.svg";
import flag from "../../../../assets/icons/register/bd.avif";
import Image from "next/image";
import Link from "next/link";
import RegisterSchema, {
  validateForm,
} from "@/schema/RegisterSchema/RegisterSchema";
import axios from "axios";

import { useRouter } from "next/navigation";
import BlackButton from "@/loaders/BlackButton/BlackButton";
import cross from "../../../../assets/icons/register/cross.svg";
import { useVerification } from "@/context/VerificationContext";
import { object } from "yup";

const Page = () => {
  const [documentsVisible, setDocumentsVisible] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [fileName, setFileName] = useState("");
  const { setVerificationCode } = useVerification();

  const [token, setToken] = useState("");
  const router = useRouter();
  const toggleDocuments = () => setDocumentsVisible(!documentsVisible);

  const setSessionTokenToLocalStorage = (session) => {
    localStorage.setItem("session", session);
    setToken(session);
    axios.defaults.headers.common["Authorization"] = `Bearer ${session}`;
    console.log("seesion token - ", session);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("session");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);
  console.log("Set token", token);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      retypePassword: "",
      legalDoc: null,
      termsAccepted: false,
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setLoader(true);
      // Handle form submission
      console.log(values);

      const formData = new FormData();
      formData.append("firstname", values.firstname);
      formData.append("lastname", values.lastname);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("retypePassword", values.retypePassword);
      if (values.legalDoc) {
        formData.append("legalDoc", values.legalDoc);
      }

      try {
        const response = await axios.post(
          "https://tarsuniverse.net:8443/auth/signup",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const rawData = response.data;
        const rawParts = rawData.split("}{").map((part, index, arr) => {
          if (index === 0) return part + "}";
          if (index === arr.length - 1) return "{" + part;
          return "{" + part + "}";
        });

        // Parse each part
        let sessionToken = null;
        let verificationCode = null;
        let successMessage = null;

        rawParts.forEach((part) => {
          try {
            const jsonPart = JSON.parse(part);
            if (jsonPart.session) {
              sessionToken = jsonPart.session;
            }
            if (jsonPart.otp) {
              verificationCode = jsonPart.otp;
              console.log("Verification Code:", verificationCode);
            }
            if (jsonPart.message) {
              successMessage = jsonPart.message;
              console.log("Success Message:", successMessage);
            }
          } catch (error) {
            console.error("Error parsing part:", error);
          }
        });

        if (sessionToken) {
          setSessionTokenToLocalStorage(sessionToken);
        }
        if (verificationCode) {
          setVerificationCode(verificationCode);
        }
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${sessionToken}`;
        router.push(`/auth/signUp/otp`);
      } catch (error) {
        setLoader(false);
        console.error("Error signing up:", error);
      } finally {
        setLoader(false);
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleFileInputClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type === "application/pdf") {
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
      formik.setFieldValue("legalDoc", file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };
  const handleCheckboxChange = (event) => {
    formik.handleChange(event);
    console.log("Terms Accepted:", formik.values.termsAccepted);
  };

  const handleRemoveFile = () => {
    setFileUrl(null);
  };

  return (
    <div className="relative  ">
      <div className="flex flex-col  pb-24  items-center  gap-4 px-4">
        <p className="text-subTitle text-center">Create Your Account</p>
        <div className="mt-1 w-full max-w-sm">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col text-[14px] items-center gap-3"
          >
            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <div className="flex flex-col w-full items-start">
                <input
                  placeholder="First Name"
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="border focus:outline-none px-2.5 bg-white shadow w-full h-10 bg-transparent rounded-md block"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.firstname && formik.touched.firstname && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.firstname}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start w-full">
                <input
                  placeholder="Last Name"
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="border focus:outline-none px-2.5 bg-white shadow w-full h-10 bg-transparent rounded-md block"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.lastname && formik.touched.lastname && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.lastname}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-start">
              {" "}
              <input
                placeholder="Username"
                type="text"
                name="username"
                id="username"
                className="border focus:outline-none px-2.5 bg-white shadow w-full h-10 bg-transparent rounded-md block"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.username && (
                <div className="text-red-500 text-xs">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div className="w-full flex flex-col items-start">
              {" "}
              <input
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                className="border focus:outline-none px-2.5 bg-white shadow w-full h-10 bg-transparent rounded-md block"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-xs">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="flex flex-col items-start w-full">
              <div className="grid grid-cols-12 gap-2 w-full items-center">
                <div className="col-span-2 mx-auto border bg-white shadow w-full h-full flex gap-1.5 items-center justify-center rounded-md">
                  <Image
                    loading="lazy"
                    src={flag}
                    alt="flag"
                    height={25}
                    width={25}
                    className="object-cover"
                  />
                  <Image
                    src={arrow}
                    alt="arrow"
                    height={10}
                    width={10}
                    loading="lazy"
                  />
                </div>
                <div className="col-span-10">
                  <input
                    placeholder="+880"
                    type="text"
                    name="phone"
                    id="phone"
                    className="border focus:outline-none px-2.5 bg-white shadow w-full h-10 bg-transparent rounded-md block"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              {formik.errors.phone && formik.touched.phone && (
                <div className="text-red-500 text-xs">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <div className="w-full flex flex-col items-start">
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                className="border focus:outline-none px-2.5 bg-white shadow w-full h-10 bg-transparent rounded-md block"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-xs">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="w-full flex flex-col">
              <input
                placeholder="Confirm Password"
                type="password"
                name="retypePassword"
                id="retypePassword"
                className="border focus:outline-none px-2.5 bg-white shadow w-full h-10 bg-transparent rounded-md block"
                value={formik.values.retypePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.retypePassword &&
                formik.touched.retypePassword && (
                  <div className="text-red-500 text-xs">
                    {formik.errors.retypePassword}
                  </div>
                )}
            </div>
            <div className="flex items-start flex-col w-full">
              <div
                onClick={toggleDocuments}
                className="border relative flex cursor-pointer items-center focus:outline-none px-2.5 bg-white shadow w-full h-10 bg-transparent rounded-md"
              >
                <div className="text-miniTitle text-[#767b86] font-light">
                  Legal Identity Document (PDF)
                </div>
                <Image
                  src={Question}
                  alt="question"
                  height={14}
                  width={14}
                  className="absolute right-3"
                  loading="lazy"
                />
              </div>
              {formik.errors.legalDoc && formik.touched.legalDoc && (
                <div className="text-red-500 text-xs">
                  {formik.errors.legalDoc}
                </div>
              )}
            </div>
            {documentsVisible && (
              <div className="w-full h-full">
                {!fileUrl ? (
                  <div
                    onClick={handleFileInputClick}
                    className="flex items-center rounded-md py-5 w-full relative justify-center border bg-white shadow cursor-pointer"
                  >
                    <div className="flex items-center flex-col gap-1">
                      <Image
                        src={upload}
                        alt="upload"
                        height={25}
                        width={25}
                        loading="lazy"
                      />
                      <p className="text-miniTitle text-[#767b86] font-extralight">
                        Upload
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between border bg-white shadow p-4 relative rounded-md">
                    <p className="text-miniTitle text-center mx-auto text-[#767b86] font-extralight">
                      {fileName}
                    </p>
                    <Image
                      onClick={handleRemoveFile}
                      src={cross}
                      alt="close"
                      height={10}
                      width={10}
                      loading="lazy"
                      className="absolute top-3 cursor-pointer right-3"
                    ></Image>
                  </div>
                )}
                <input
                  id="fileInput"
                  type="file"
                  name="legalDoc"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}

            <div className="flex flex-col items-start mr-auto">
              <div className="flex items-center gap-x-1.5 ">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  id="termsAccepted"
                  checked={formik.values.termsAccepted}
                  onChange={handleCheckboxChange}
                />
                <p className="text-[14px] text-[#767b86] font-extralight">
                  I agree to the{" "}
                  <span className="text-blue-800">Terms & Conditions</span> and{" "}
                  <span className="text-blue-800">Privacy Policy</span>.
                </p>
              </div>
              {formik.errors.termsAccepted && (
                <div className="text-red-500 text-xs">
                  {formik.errors.termsAccepted}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={
                !formik.isValid || !formik.dirty || !formik.values.termsAccepted
              }
              className={`border bg-black text-gray-100" font-light text-miniTitle border-gray-400 w-full mt-5 h-10 rounded-md  ${
                formik.isValid && formik.dirty && formik.values.termsAccepted
                  ? "bg-black text-gray-100"
                  : "bg-transparent text-s cursor-wait"
              }`}
            >
              {loader ? <BlackButton /> : "Next"}
            </button>

            <p className="font-extralight text-[14px] mt-4">
              Already have an account?{" "}
              <Link href="/auth/signIn" className="text-blue-800">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
