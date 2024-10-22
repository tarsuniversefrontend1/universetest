"use client";
import Image from "next/image";
import logo from "../../../../assets/icons/officialIcons/blackUniverse.svg";
import arrow from "../../../../assets/icons/login/arrow.svg";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import SignInSchema from "@/schema/SignInSchema/SignInSchema";
import { useRouter } from "next/navigation";
import { UserContext } from "@/lib/UserProvider/UserProvider";

const Page = () => {
  const router = useRouter();
  const [Input, setInput] = useState(false);
  const [online, setOnline] = useState(false);
  const [apiError, setApiError] = useState(false);
  const { setUser } = useContext(UserContext);

  const toggleInput = () => {
    setInput(!Input);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("https://tarsuniverse.net:8443")
        .then(() => setOnline(true))
        .catch(() => setOnline(false));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://tarsuniverse.net:8443/auth/signin",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const { session } = response.data;
          localStorage.setItem("session", session);
          sessionStorage.setItem("session", session);

          axios.defaults.headers.common["Authorization"] = `Bearer ${session}`;

          const profileResponse = await axios.get(
            "https://tarsuniverse.net:8443/profile",
            { withCredentials: true }
          );
          setUser(profileResponse.data);

          router.push("/home/");
        }
      } catch (error) {
        console.error("Error:", error);
        setApiError(true);
      }

      console.log("Form values submitted:", values);
    },
  });

  return (
    <div className=" mt-8 xl:mt-[12%]">
      {!online && (
        <div className="w-3 h-3 fixed left-8 top-8 rounded-full bg-red-500"></div>
      )}
      {online && (
        <div className="w-3 h-3 fixed left-8 top-8 rounded-full bg-green-500"></div>
      )}
      <div className="box pt-10 pb-20 md:h-[28rem] md:w-[30rem]">
        <div className="flex items-center flex-col">
          <Image src={logo} alt="logo" width={85} height={85} loading="lazy" />
        </div>

        <div className="flex md:px-0 px-4 items-center mt-6 flex-col ">
          <form onSubmit={formik.handleSubmit} className="absolute">
            <div className="md:w-[22rem] w-[20rem]  relative">
              <input
                type="text"
                placeholder="Enter Your Email"
                className={`px-3 focus:outline-none w-full sf-pro-display text-[15px] font-extralight border ${
                  (formik.errors.email && formik.touched.email) || apiError
                    ? "border-red-600 bg-red-100"
                    : "border-gray-400"
                } text-gray-500 h-10 ${Input ? "rounded-t-lg" : "rounded-lg"}`}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="text-red-500 md:block hidden text-xs absolute top-1 -right-[9rem] bg-white px-4 py-2 rounded-md border">
                  {formik.errors.email}
                </div>
              )}
              {!Input && (
                <Image
                  onClick={toggleInput}
                  src={arrow}
                  alt="arrow"
                  height={45}
                  width={45}
                  className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2"
                />
              )}
            </div>
            {Input && (
              <>
                <div className="md:w-[22rem] w-[20rem] relative">
                  <input
                    placeholder="Enter Your Password"
                    type="password"
                    className={`px-3 focus:outline-none w-full sf-pro-display text-[15px] font-extralight border-t-0 border ${
                      (formik.errors.password && formik.touched.password) ||
                      apiError
                        ? "border-red-600 bg-red-100"
                        : "border-gray-400"
                    } text-gray-500 h-10 rounded-b-lg`}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onFocus={(e) => (e.target.type = "text")}
                    onBlur={(e) => (e.target.type = "password")}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className="text-red-500 md:block hidden text-xs absolute top-1 -right-[10.5rem] bg-white px-4 py-2 rounded-md border">
                      {formik.errors.password}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <Image
                      src={arrow}
                      className="cursor-pointer"
                      alt="arrow"
                      height={45}
                      width={45}
                    />
                  </button>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input type="checkbox" />
                  <p className="text-paragraph font-extralight">
                    {" "}
                    Keep me signed in
                  </p>
                </div>
              </>
            )}
            <div className="flex  items-center text-[15px] font-light mt-12 text-blue-800  flex-col justify-center gap-2">
              <Link href="/auth/resetPassword">Forgot Password?</Link>
              <Link href="/auth/signUp">Create Your Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
