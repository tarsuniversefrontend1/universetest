"use client";
import {  useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { UserContext } from "@/lib/UserProvider/UserProvider";
import { GeneralInfoSchema } from "@/schema/GeneralInfoSchema/GeneralInfoSchema";
const Education = () => {
  const [loading, setLoading] = useState(false); 
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
    const { user } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      current_institution: user?.education?.current_institution || "",
      current_department: user?.education?.current_department || "",
      enrollment_date: user?.education?.enrollment_date || "",
      course_timeline_months: user?.education?.course_timeline_months || "",
      last_institution: user?.education?.last_institution || "",
      last_department: user?.education?.last_department || "",
      last_grade: user?.education?.last_grade || "",
    },
    validationSchema: GeneralInfoSchema(),
    validateOnBlur: true,
    validatet: async (values) => {
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

  return (
    <div>

      <div className="border mt-2 transition-all duration-300 flex flex-col items-start gap-4 rounded-xl w-full p-3">
        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">Last Education Institution</p>
          <input
            type="text"
            name="last_institution"
            value={user?.education?.last_institution}
            
            placeholder={user?.education?.last_institution}
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
          />
        </div>
        <div className="flex items-center gap-4 w-full">
          <div className="flex w-full flex-col items-start gap-1">
            <p className="text-paragraph">Subject/Department</p>
            <input
              type="text"
              name="last_department"
              value={user?.education?.last_department}
              
              placeholder={user?.education?.last_department}
              className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
            />
          </div>
          <div className="flex w-full flex-col items-start gap-1">
            <p className="text-paragraph">Grade</p>
            <input
              type="text"
              name="last_grade"
              value={user?.education?.last_grade}
              
              placeholder={user?.education?.last_grade}
              className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
            />
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-200"></div>

        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">Current Education Institution</p>
          <input
            type="text"
            name="current_institution"
            value={user?.education?.current_institution}
            
            placeholder={user?.education?.current_institution}
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
          />
        </div>

        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">Subject/Department</p>
          <input
            type="text"
            name="current_department"
            value={user?.education?.current_department}
            
            placeholder={user?.education?.current_department}
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
          />
        </div>

        <div className="flex items-center gap-4 w-full">
          <div className="flex w-full flex-col items-start gap-1">
            <p className="text-paragraph">Enrolled</p>
            <input
              type="date"
              name="enrollment_date"
              value={user?.education?.enrollment_date}
              
              placeholder={user?.education?.enrollment_date}
              className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
            />
          </div>

          <div className="flex w-full flex-col items-start gap-1">
            <p className="text-paragraph">Course Timeline (Months)</p>
            <input
              type="text"
              name="course_timeline_months"
              value={user?.education?.course_timeline_months}
              
              placeholder={user?.education?.course_timeline_months}
              className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
            />
          </div>
        </div>

        <div className="flex w-full justify-end items-center mt-3 gap-4">
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
      </div>
    </div>
  );
};

export default Education;



