"use client";
import Image from "next/image";
import legalDoc from "../../../../assets/icons/settings/legalDoc.png";
import stop from "../../../../assets/icons/settings/stop.png";
import { useFormik } from "formik";
import plus from "../../../../assets/icons/settings/plus.png";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { UserContext } from "@/lib/UserProvider/UserProvider";
import { GeneralInfoSchema } from "@/schema/GeneralInfoSchema/GeneralInfoSchema";
import PdfModal from "./PdfModal/PdfModal";

const GeneralInformation = () => {
  const { user } = useContext(UserContext);
  console.log("user from general - ", user);
  const [loading, setLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [success, setSuccess] = useState("");
  const pdfUrl = "/icons/settings/sample.pdf";
  const fileInputRef = useRef(null);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleDivClick = () => {
    fileInputRef.current.click();
  };
  const [error, setError] = useState("");

  const handleFocus = () => {
    if (isReadOnly) {
      setShowPrompt(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: user?.firstname || null,
      lastname: user?.lastname || null,
      username: user?.username || null,
      email: user?.email || null,
      biodata: user?.biodata || null,
      phone: user?.phone || null,
      dateOfBirth: user?.dateOfBirth || null,
      froms: user?.froms || null,
      lives_in: user?.lives_in || null,
    },
    validationSchema: GeneralInfoSchema(),
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values) => {
      setError("");
      setLoading(true);
      console.log("Submitted Values:", values);

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        const value = values[key];
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value || "");
        }
      });

      const url = "https://tarsuniverse.net:8443/settings/general";
      const method = Object.values(values).some((field) => field === null)
        ? "POST"
        : "PUT";

      try {
        setError("");
        const response = await axios({
          method: method,
          url: url,
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          data: formData,
          withCredentials: true,
        });

        setSuccess("Saved successfully!");
        setTimeout(() => setSuccess(""), 2000);
        console.log("Response:", response.data);
        console.log(`${method} Response:`, response);
      } catch (error) {
        setError("Failed");
        console.error("Error:", error);
        if (error.response) {
          setError("Failed");
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSendRequest = () => {
    console.log("Request sent to update the name");
    setIsReadOnly(true);
    setShowPrompt(false);
    setRequestSent(true);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="border mt-2 flex flex-col items-start gap-4 p-3 w-full rounded-xl"
    >
      <div className="flex items-start gap-4 w-full">
        <div className="flex w-full relative flex-col items-start gap-1">
          <p className="text-paragraph">First Name</p>
          <input
            type="text"
            readOnly={isReadOnly}
            onFocus={handleFocus}
            name="firstname"
            value={user?.firstname}
            defaultValue={user?.firstname}
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 b shadow-sm shadow-gray-300"
            {...formik.getFieldProps("firstname")}
          />
          {formik.touched.firstname && formik.errors.firstname ? (
            <p className="text-xs font-light text-red-800">
              {formik.errors.firstname}
            </p>
          ) : null}
        </div>
        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">Last Name</p>
          <div className="flex items-center w-full gap-3">
            <input
              readOnly={isReadOnly}
              onFocus={handleFocus}
              value={user?.lastname}
              name="lastname"
              type="text"
              defaultValue={user?.lastname}
              className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 b shadow-sm shadow-gray-300"
              {...formik.getFieldProps("lastname")}
            />
            {requestSent && (
              <>
                <div class="w-4 h-4 border-2 border-t-2 border-t-yellow-400 border-transparent rounded-full animate-spin"></div>
              </>
            )}
            {showPrompt && (
              <div className="relative group">
                <Image
                  width={15}
                  loading="lazy"
                  src={stop}
                  className="cursor-pointer"
                  alt="!"
                />
                <div className="absolute w-40 bottom-5 text-[10px] font-thin rounded-lg shadow-sm shadow-gray-300 right-2 px-4 py-2 bg-white hidden group-hover:block">
                  first name and last name should not be changed for security
                  reasons.
                </div>
              </div>
            )}
            <div
              className={`fixed top-20 right-0 bg-red-50 px-5 py-2 rounded-lg shadow-sm shadow-red-300 transition-transform duration-300 ${
                showPrompt ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <p className="text-xs font-light text-center">
                  Want to update?{" "}
                </p>
                <div
                  className="bg-red-800 cursor-pointer rounded-xl text-xs px-3 py-1 text-white"
                  onClick={handleSendRequest}
                >
                  Send Request
                </div>
              </div>
            </div>
          </div>
          {formik.touched.lastname && formik.errors.lastname ? (
            <p className="text-xs font-light text-red-800">
              {formik.errors.lastname}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-1">
        <p className="text-paragraph">Username</p>
        <input
          type="text"
          value={user?.username}
          defaultValue={user?.username}
          name="username"
          id="username"
          className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 b shadow-sm shadow-gray-300"
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username ? (
          <p className="text-xs font-light text-red-800">
            {formik.errors.username}
          </p>
        ) : null}
      </div>
      <div className="flex w-full flex-col items-start gap-1">
        <p className="text-paragraph">Email</p>
        <input
          type="email"
          name="email"
          value={user?.email}
          defaultValue={user?.email}
          className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 b shadow-sm shadow-gray-300"
          {...formik.getFieldProps("email")}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-xs font-light text-red-800">
            {formik.errors.email}
          </p>
        ) : null}
      </div>
      <div className="flex w-full flex-col items-start gap-1">
        <div className="w-full flex items-center justify-between">
          <p className="text-paragraph">Biodata</p>{" "}
          <p
            className={`text-[10px] ${
              formik?.values?.biodata?.length >= 500
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            {user?.biodata?.length > 0 ? user?.biodata?.length : 0}/500
          </p>
        </div>
        <textarea
          name="biodata"
          value={user?.biodata}
          defaultValue={user?.biodata}
          style={{
            borderColor:
              formik.touched.biodata && formik.errors.biodata ? "red" : "black",
            textDecoration:
              formik.touched.biodata && formik.errors.biodata
                ? "underline"
                : "none",
          }}
          className="w-full py-1 focus:outline-none text-paragraph  font-extralight px-3 rounded-md h-full b shadow-sm shadow-gray-300"
          {...formik.getFieldProps("biodata")}
          cols="30"
          rows="6"
        ></textarea>
        {formik.touched.biodata && formik.errors.biodata ? (
          <p className="text-xs font-light text-red-800">
            {formik.errors.biodata}
          </p>
        ) : null}
      </div>
      <div className="flex w-full flex-col items-start gap-1">
        <p className="text-paragraph">Phone</p>
        <input
          name="phone"
          value={user?.phone}
          type="text"
          defaultValue={user?.phone}
          className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 b shadow-sm shadow-gray-300"
          {...formik.getFieldProps("phone")}
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className="text-xs font-light text-red-800">
            {formik.errors.phone}
          </p>
        ) : null}
      </div>
      <div className="flex w-full flex-col items-start gap-1">
        <p className="text-paragraph">Birth Date</p>
        <input
          type="date"
          name="dateOfBirth"
          value={user?.dateOfBirth}
          defaultValue={user?.dateOfBirth}
          className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 b shadow-sm shadow-gray-300"
          {...formik.getFieldProps("dateOfBirth")}
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
          <p className="text-xs font-light text-red-800">
            {formik.errors.dateOfBirth}
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-4 w-full">
        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">From</p>
          <input
            type="text"
            name="froms"
            value={user?.froms}
            defaultValue={user?.froms}
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 b shadow-sm shadow-gray-300"
            {...formik.getFieldProps("froms")}
          />
          {formik.touched.froms && formik.errors.froms ? (
            <p className="text-xs font-light text-red-800">
              {formik.errors.froms}
            </p>
          ) : null}
        </div>
        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">Lives In</p>
          <input
            type="text"
            name="lives_in"
            value={user?.lives_in}
            defaultValue={user?.lives_in}
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 b shadow-sm shadow-gray-300"
            {...formik.getFieldProps("lives_in")}
          />
          {formik.touched.lives_in && formik.errors.lives_in ? (
            <p className="text-xs font-light text-red-800">
              {formik.errors.lives_in}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex items-start gap-5">
        <p className="text-paragraph">Legal Document</p>
        <div className="flex flex-col items-start gap-2">
          <div
            onClick={handleModalOpen}
            className="grid grid-cols-2 cursor-pointer items-center gap-1"
          >
            <span className="text-paragraph font-thin">1.</span>{" "}
            <div className="relative">
              <div className="absolute h-1.5 w-1.5 bottom-0 right-0 rounded-full bg-red-600"></div>
              <Image
                src={legalDoc}
                alt="file"
                width={14}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </div>
          <PdfModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            pdfUrl={pdfUrl}
          />
          <div className="grid grid-cols-2 items-center gap-1">
            <span className="text-paragraph font-thin">2.</span>{" "}
            <div className="relative">
              <div className="absolute h-1.5 w-1.5 bottom-0 right-0 rounded-full bg-green-600"></div>
              <Image
                src={legalDoc}
                alt="file"
                width={14}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 items-center gap-1">
            <span className="text-paragraph font-thin">3.</span>{" "}
            <div className="relative">
              <div className="absolute h-1.5 w-1.5 bottom-0 right-0 rounded-full bg-yellow-600"></div>
              <Image
                src={legalDoc}
                alt="file"
                width={14}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div>
            <div
              className="flex cursor-pointer items-center gap-1.5"
              onClick={handleDivClick}
            >
              <Image
                src={plus}
                alt="plus"
                height={10}
                width={10}
                loading="lazy"
              />
              <div className="font-light text-xs cursor-pointer">Add</div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => console.log(e.target.files)}
            />
          </div>
        </div>
      </div>
      <div className="flex w-full  justify-end items-center gap-4">
        <button className="border text-[12px] font-light border-gray-300 w-20 py-1 rounded-lg">
          Cancel
        </button>
        <button
          className={`text-white text-[12px] font-light  w-20 py-1 rounded-lg ${
            success ? "bg-green-900" : "bg-blue-900"
          } ${!success && loading && "bg-red-900"}`}
        >
          {loading ? (
            <div class="h-3 w-3 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span>{success ? "Saved" : "Save"}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default GeneralInformation;
