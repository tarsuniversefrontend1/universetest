"use client";
import Image from "next/image";
import React, { useContext, useEffect, useMemo, useState } from "react";
import arrowIcon from "../../../../assets/icons/register/arrow.svg";
import uploadImage from "../../../../assets/icons/create/uploadImage.svg";
import Link from "next/link";
import dot from "../../../../assets/icons/home/timeline/threeDot.svg";
import { useRouter } from "next/navigation";
import ProjectFetch from "@/hooks/ProjectFetch/ProjectFetch";
import clock from "../../../../assets/icons/create/clock.svg";
import github from "../../../../assets/icons/create/github.svg";
import check from "../../../../assets/icons/create/check.svg";
import pending from "../../../../assets/icons/create/pending.svg";
import Cross from "../../../../assets/icons/register/cross.svg";
import { UserContext } from "@/lib/UserProvider/UserProvider";
import like from "../../../../assets/icons/home/timeline/like.svg";
import comment from "../../../../assets/icons/home/timeline/comment.svg";
import share from "../../../../assets/icons/home/timeline/share.svg";
import arrow from "../../../../assets/icons/register/arrow.svg";
import axios from "axios";

export const currencyConverter = {
  usd: 119.13,
  cad: 86.12,
};

const CreateProject = () => {
  const router = useRouter();
  const { values, handleSubmit, touched, errors, handleChange, setFieldValue } =
    ProjectFetch();
  const [allowComments, setAllowComments] = useState(false);
  const [amount, setAmount] = useState(50);
  const [currencyType, setCurrencyType] = useState("usd");
  const [convertedAmount, setConverTedAmount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useContext(UserContext);

  //currency converter reference object

  // handle currency selection and convert currency into bdt
  useEffect(() => {
    if (amount === 50) {
      document.getElementById("fifty").checked = true;
      document.getElementById("hundrad").checked = false;
    } else if (amount === 100) {
      document.getElementById("hundrad").checked = true;
      document.getElementById("fifty").checked = false;
    } else {
      document.getElementById("hundrad").checked = false;
      document.getElementById("fifty").checked = false;
    }
    setConverTedAmount(amount * currencyConverter[currencyType]);
    values.price = amount;
    values.comment_allowed = allowComments;
  }, [amount, currencyType, allowComments]);

  // handle technology array
  const [tech, setTech] = useState("");
  useMemo(() => {
    values.tools_and_technologies = tech.split(",");
  }, [tech, values]);

  // handle keywords array
  const [keyword, setKeyword] = useState("");
  useMemo(() => {
    values.keywords = keyword.split(",");
  }, [keyword, values]);

  /// image and video uplaod , drag and drop , remove
  const [dragActiveImage, setDragActiveImage] = useState(false);
  const [dragActiveVideo, setDragActiveVideo] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // Image preview state
  const [videoPreview, setVideoPreview] = useState(null); // Video preview state

  // Handlers for thumbnail image drag and drop
  const handleDragImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveImage(true);
    } else if (e.type === "dragleave") {
      setDragActiveImage(false);
    }
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveImage(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFieldValue("thumb", file);
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  const handleFileChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("thumb", file);
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  // Remove image
  const removeImage = () => {
    setFieldValue("thumb", null);
    setImagePreview(null); // Clear image preview
  };

  // Handlers for project video drag and drop
  const handleDragVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveVideo(true);
    } else if (e.type === "dragleave") {
      setDragActiveVideo(false);
    }
  };

  const handleDropVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveVideo(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFieldValue("video", file);
      setVideoPreview(URL.createObjectURL(file)); // Set video preview
    }
  };

  const handleFileChangeVideo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("video", file);
      setVideoPreview(URL.createObjectURL(file)); // Set video preview
    }
  };

  // Remove video
  const removeVideo = () => {
    setFieldValue("video", null);
    setVideoPreview(null); // Clear video preview
  };

  // Handlers for category of projects
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    values.category = selectedCategory;
  }, [selectedCategory]);

  const handleFocus = () => {
    setDropdownVisible(true);
  };

  const handleBlur = () => {
    setDropdownVisible(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    values.category = e.target.value;
    const filtered = data.filter((item) =>
      item.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered); // Update filtered data based on the input
  };

  useEffect(() => {
    axios
      .get("/projectCategory.json")
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data); // Initialize filtered data
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSelectIndustry = (item) => {
    setSelectedCategory(item.category);
    setDropdownVisible(false);
  };

  return (
    <div className="flex justify-center">
      {/* Top card for introduction  */}
      <form onSubmit={handleSubmit} className={``}>
        <>
          <div
            className={`sm:sm:max-w-[620px]  w-full mx-auto bg-white shadow-sm shadow-gray-300 rounded-lg
            `}
          >
            <div className="flex justify-between items-start p-4 ">
              <div className="max-w-[380px] w-full ">
                <h2
                  className="sf-pro-display font-bold flex items-center gap-2 cursor-pointer"
                  onClick={() => router.back()}
                >
                  <Image
                    src={arrowIcon}
                    alt="previous page"
                    className="w-3.5 rotate-90 cursor-pointer mt-1"
                  />
                  Create a new project
                </h2>
                <p className="sf-pro-display text-[13px] opacity-70 text-wrap mt-2 ">
                  Fill the information field about the project that you want to
                  create
                </p>
              </div>
              <div className="max-w-[200px] w-full flex justify-end items-center gap-4 mt-3">
                <p className="text-[15px] ">Privacy</p>
                <select
                  className="bg-btnSecondary py-0.5 px-1 max-w-[65px] rounded-md text-[13px] outline-none"
                  name="visibility"
                  id="visibility"
                  onChange={handleChange}
                  value={values.visibility}
                >
                  <option
                    value="public"
                    className="text-black bg-white text-[13px]"
                  >
                    assets
                  </option>
                  <option
                    value="private"
                    className="text-black bg-white text-[13px]"
                  >
                    Private
                  </option>
                  <option
                    value="onlyme"
                    className="text-black bg-white text-[13px]"
                  >
                    Only me
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* form section  */}

          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white rounded-t-lg mt-3 border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Title</span>
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 py-1"
                  placeholder="Enter title of your project"
                />
                {errors.title && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.title}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Project Description</span>
              </div>
              <div className="col-span-3">
                <textarea
                  rows={5}
                  id="short_description"
                  value={values.short_description}
                  name="short_description"
                  onChange={handleChange}
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 py-1 rounded-md "
                  placeholder="Project description"
                />
                {errors.short_description && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.short_description}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image card  */}

          <div className="sm:sm:max-w-[620px] w-full mx-auto bg-white border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Project Thumbnail</span>
              </div>
              <div className="col-span-3">
                <div
                  className={`bg-gray-100 w-full text-paragraph font-extralight rounded-md h-44 flex flex-col justify-center items-center gap-2  ${
                    dragActiveImage ? "border-blue-600" : "border-gray-400"
                  }`}
                  onDragEnter={handleDragImage}
                  onDragLeave={handleDragImage}
                  onDragOver={handleDragImage}
                  onDrop={handleDropImage}
                >
                  {imagePreview ? (
                    <div className="relative">
                      <Image
                        src={imagePreview}
                        alt="Thumbnail Preview"
                        width={200}
                        height={80}
                        className=" object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-2 text-[12px] right-2 bg-red-500 text-white rounded-full py-0.4 px-1"
                        onClick={removeImage}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <Image src={uploadImage} alt="upload image" />
                      <div>
                        <p className="text-gray-500 text-[13px]">
                          Drag the file here or{" "}
                          <span
                            className="text-blue-600 text-[14px] cursor-pointer"
                            onClick={() =>
                              document.getElementById("uploadImage").click()
                            }
                          >
                            Select
                          </span>
                        </p>
                        <p className="text-gray-500 text-center text-[11px]">
                          [Maximum file size is 5MB]
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  id="uploadImage"
                  className="hidden"
                  onChange={handleFileChangeImage}
                />
                {errors.thumb && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.thumb}
                  </div>
                )}
                {/* {formik.errors.projectThumbnail &&
                formik.touched.projectThumbnail ? (
                  <div className="text-red-500">
                    {formik.errors.projectThumbnail}
                  </div>
                ) : null} */}
              </div>
            </div>
          </div>

          {/* Video card  */}
          <div className="sm:sm:max-w-[620px] w-full mx-auto bg-white border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Project Video</span>
              </div>
              <div className="col-span-3">
                <div
                  className={`bg-gray-100 w-full text-paragraph font-extralight rounded-md h-44 flex flex-col justify-center items-center gap-2  ${
                    dragActiveVideo ? "border-blue-600" : "border-gray-400"
                  }`}
                  onDragEnter={handleDragVideo}
                  onDragLeave={handleDragVideo}
                  onDragOver={handleDragVideo}
                  onDrop={handleDropVideo}
                >
                  {videoPreview ? (
                    <div className=" flex justify-center items-center">
                      <div className="relative w-[95%] h-[60%]">
                        <video
                          src={videoPreview}
                          controls
                          className="h-full w-auto object-contain "
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full py-0.4 px-1 text-[12px]"
                          onClick={removeVideo}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Image src={uploadImage} alt="upload video" />
                      <div>
                        <p className="text-gray-500 text-[13px]">
                          Drag the file here or{" "}
                          <span
                            className="text-blue-600 text-[14px] cursor-pointer"
                            onClick={() =>
                              document.getElementById("uploadVideo").click()
                            }
                          >
                            Select
                          </span>
                        </p>
                        <p className="text-gray-500 text-center text-[11px]">
                          [Maximum file size is 5MB]
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  id="uploadVideo"
                  className="hidden"
                  onChange={handleFileChangeVideo}
                />
                {errors.video && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.video}
                  </div>
                )}

                {/* {formik.errors.projectVideo && formik.touched.projectVideo ? (
              <div className="text-red-500">{formik.errors.projectVideo}</div>
            ) : null} */}
              </div>
            </div>
          </div>

          {/* ...................................  */}
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Category</span>
              </div>
              <div className="col-span-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select Category..."
                    className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 py-1 relative"
                    value={selectedCategory}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleInputChange}
                  />
                  {errors.category && (
                    <div className="text-red-500 text-xs ml-2 mt-0.5">
                      {errors.category}
                    </div>
                  )}

                  <Image
                    loading="lazy"
                    src={arrow}
                    height={12}
                    width={12}
                    alt="->"
                    onClick={() => setDropdownVisible(true)}
                    className="absolute right-3 top-4"
                  />
                  {dropdownVisible && filteredData.length > 0 && (
                    <div className="w-full flex items-start flex-col bg-white rounded-lg absolute z-[9999] top-10 overflow-y-auto shadow-sm shadow-gray-300 h-48">
                      {filteredData.map((item, index) => (
                        <button
                          key={index}
                          className="w-full text-start px-3 hover:bg-gray-100 transition-all duration-300 py-2 text-xs font-light"
                          onMouseDown={() => handleSelectIndustry(item)} // Use onMouseDown to avoid losing focus
                        >
                          {item?.category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Status</span>
              </div>
              <div className="col-span-3">
                <select
                  id="status"
                  name="status"
                  className="bg-gray-100 w-full focus:outline-none text-[13px] font-extralight px-3 rounded-md h-9 py-1"
                  value={values.status}
                  onChange={handleChange}
                >
                  <option value="complete">Completed</option>
                  {/* <option value="not-complete">Not Completed</option> */}
                </select>
                {errors.status && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.status}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">
                  Tools & Technologies
                </span>
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 py-1"
                  placeholder="ex: GoLang, Python...."
                  value={tech}
                  onChange={(e) => setTech(e.target.value)}
                />
                {errors.tools_and_technologies && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.tools_and_technologies}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Expected Outcomes</span>
              </div>
              <div className="col-span-3">
                <textarea
                  id="expected_outcomes"
                  name="expected_outcomes"
                  rows={5}
                  value={values.expected_outcomes}
                  onChange={handleChange}
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 py-1 rounded-md "
                  placeholder="This project will..."
                />
                {errors.expected_outcomes && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.expected_outcomes}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Challenges</span>
              </div>
              <div className="col-span-3">
                <textarea
                  id="challenges"
                  name="challenges"
                  rows={5}
                  value={values.challenges}
                  onChange={handleChange}
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 py-1 rounded-md "
                  placeholder="Our System ..."
                />
                {errors.challenges && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.challenges}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Add Value</span>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col justify-start items-start gap-4 w-full">
                  <div className="w-full grid grid-rows-1 grid-cols-10 ">
                    <div className="col-span-1 col-start-1 mt-4 hidden sm:flex sm:items-center sm:gap-1">
                      <input
                        type="radio"
                        value="50"
                        id="fifty"
                        onClick={() => setAmount(50)}
                        className="focus:outline-none focus:border-none "
                      />{" "}
                      <label htmlFor="fifty" className="text-[14px] ">
                        50
                      </label>
                    </div>
                    <div className=" col-start-2 mt-4 hidden  sm:flex sm:items-center sm:gap-1">
                      <input
                        type="radio"
                        value="100"
                        id="hundrad"
                        onClick={() => setAmount(100)}
                        className="focus:outline-none focus:border-none "
                      />{" "}
                      <label htmlFor="hundred" className="text-[14px] ">
                        100
                      </label>
                    </div>
                    <fieldset className="col-span-5 col-start-1 sm:col-span-1 md:col-span-2 sm:col-start-4 md:col-start-5 border rounded-md border-gray-400">
                      <legend className="ml-4 text-gray-600 text-[12px] px-1">
                        Custom Amount
                      </legend>
                      <input
                        type="number"
                        name="currency"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className=" my-1 pl-2 focus:outline-none w-full sm:w-fit text-[14px]"
                      />
                    </fieldset>
                    <fieldset className="col-start-7 col-span-4  sm:col-span-3 md:col-span-4 sm:col-start-9 md:col-start-9 border rounded-md border-gray-400">
                      <legend className="ml-4 text-gray-600 text-[12px] px-1">
                        Currency
                      </legend>
                      <select
                        className="w-full px-2 focus:outline-none text-[12px]"
                        value={currencyType}
                        onChange={(e) => setCurrencyType(e.target.value)}
                      >
                        <option value="usd">USD</option>
                        <option value="cad">CAD</option>
                      </select>
                    </fieldset>
                  </div>

                  <div className="w-full h-10 flex justify-center items-center rounded-md bg-gray-100">
                    <p className="font-light text-[14px]">
                      Converted Amount: <span>{convertedAmount} TK</span>
                    </p>
                  </div>
                  <div className="w-full pt-0.5 ">
                    <p className="text-[12px] font-light text-gray-700">
                      Note: Please input a price for your project to help others
                      undersatand its value, Remember to consider factors such
                      as materials, labour, and complexity when setting the
                      price. Providing an accurate reflection of your project
                      &apos;s worth enhances transparency and fosters trust
                      within our community. Thank you for contributing!
                    </p>
                  </div>
                </div>
                {errors.amount && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.amount}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Team Members</span>
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  id="team_members"
                  name="team_members"
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 py-1"
                  placeholder="johndoe, rose, ..."
                  value={values.team_members}
                  onChange={handleChange}
                />
                {errors.team_members && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.team_members}
                  </div>
                )}
                <div className="flex justify-start items-center gap-2 mt-1 text-gray-700">
                  <input
                    type="checkbox"
                    id="is_seeking_colab"
                    name="is_seeking_colab"
                    checked={values.is_seeking_colab}
                    onChange={(e) => handleChange(e)}
                  />
                  <label
                    htmlFor="is_seeking_colab"
                    className=" text-[13px] cursor-pointer  font-light"
                  >
                    Seeking Collaboration
                  </label>
                </div>
                {errors.is_seeking_colab && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.is_seeking_colab}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Repository Link</span>
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  onChange={handleChange}
                  name="repository_link"
                  id="repository_link"
                  value={values.repository_link}
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 py-1 placeholder:text-end"
                  placeholder="e.g.Github,Bitbucket"
                />
                {errors.repository_link && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.repository_link}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Documentation Link</span>
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  id="doc_link"
                  name="doc_link"
                  onChange={handleChange}
                  value={values.doc_link}
                  placeholder=""
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 py-1 "
                />
                {errors.doc_link && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.doc_link}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Official Website</span>
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  onChange={handleChange}
                  id="official_website_link"
                  name="official_website_link"
                  value={values.official_website_link}
                  placeholder=""
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 py-1 "
                />
                {errors.official_website_link && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.official_website_link}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full mx-auto bg-white  border-b-2 rounded-b-lg border-gray-100">
            <div className="grid grid-rows-1 grid-cols-4 p-3">
              <div className="col-span-1 flex justify-start items-center">
                <span className="ml-2 text-paragraph">Keywords</span>
              </div>
              <div className="col-span-3">
                <input
                  type="text"
                  name="keywords"
                  id="keywords"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="bg-gray-100 w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 py-1 "
                />
                {errors.keywords && (
                  <div className="text-red-500 text-xs ml-2 mt-0.5">
                    {errors.keywords}
                  </div>
                )}
                <div className="flex justify-start items-center gap-2">
                  <div
                    className={`w-6 h-3 ${
                      allowComments ? "bg-green-400" : "bg-gray-400"
                    } rounded-full relative mt-2 cursor-pointer`}
                    onClick={() => setAllowComments((prev) => !prev)}
                  >
                    <div
                      className={`w-3 h-3 rounded-full absolute bg-white top-1/2 transition-all -translate-y-1/2 ${
                        allowComments ? "right-[1px]" : "left-[1px]"
                      }`}
                    />
                  </div>
                  <p className="text-[13px] opacity-80 mt-1.5">
                    Allow Comments
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" sm:sm:max-w-[620px]  w-full rounded-b-lg mx-auto mb-40 mt-4 ">
            <div className=" flex justify-end">
              <div
                className={` text-[13px] py-1.5 px-8 rounded-lg md:mr-0 mr-2.5 bg-black text-white border border-gray-400 cursor-pointer`}
                onClick={() => {
                  if (Object.keys(errors).length === 0 || 1) {
                    setShowPreview(true);
                  }
                }}
              >
                Preview
              </div>
            </div>
          </div>
        </>

        {showPreview && (
          <div className="fixed top-[5rem] left-1/2 -translate-x-1/2 z-50 ">
            <div
              className=" bg-white   rounded-xl w-[90vw] sm:w-[620px] h-auto"
              style={{ boxShadow: "0px 1px 50px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex justify-between items-start px-8 sticky rounded-t-xl top-0 bg-white p-4 border-b border-gray-300">
                <h2 className="sf-pro-display font-bold">Preview</h2>
                <Image
                  src={Cross}
                  className="w-3 h-auto fill-black mt-1.5 cursor-pointer"
                  alt="close"
                  onClick={() => setShowPreview(false)}
                />
              </div>

              <div className="p-4 max-h-[80vh] sm:max-h-[75vh] overflow-y-scroll">
                <div className="px-3 w-full ">
                  {/* project card start  */}

                  <div className="flex flex-col gap-3 mt-2">
                    <div className="w-full items-center justify-between flex">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.profileImageURL.String}
                          alt="profile"
                          width={40}
                          height={40}
                          className="rounded-full object-cover object-top w-10 h-10"
                        />
                        <div className="flex flex-col items-start ">
                          <p className="text-[17px]">
                            {user.firstname} {user.lastname}{" "}
                            {values.team_members.length > 1 && (
                              <>
                                <span className="text-[14px] opacity-70">
                                  is with
                                </span>
                                <span className="text-[15px]">
                                  {" "}
                                  {values.team_members.length} others
                                </span>
                              </>
                            )}
                          </p>
                          <div className="flex justify-start gap-2 items-center">
                            <Image src={clock} alt="time" className="w-4 h-4" />
                            <p className="text-[13px] font-light">Now</p>
                          </div>
                        </div>
                      </div>
                      <Image
                        src={dot}
                        alt="dot"
                        width={20}
                        className=" h-[25px] cursor-pointer object-cover"
                      />
                    </div>

                    <div
                      className={`${
                        values.category.length > 1 ? "mt-2" : "mt-0"
                      }`}
                    >
                      {values.category.length > 1 && (
                        <div className="w-full flex justify-start items-center flex-wrap gap-2">
                          <p className="bg-black px-3 py-1 rounded-full text-white font-light text-[12px] inline-block">
                            {values.category}
                          </p>
                        </div>
                      )}
                      <p className="text-miniTitle mt-2 font-semibold text-gray-700">
                        {values.title}
                      </p>
                      <p className="text-paragraph mt-3 font-light">
                        {values.short_description}
                      </p>
                    </div>
                    <div className=" flex flex-col sm:flex-row justify-start gap-2 sm:gap-8 items-start sm:items-center">
                      {values.doc_link.length > 0 ||
                        (values.official_website_link.length > 0 && (
                          <div className="  flex justify-start items-center gap-2">
                            {values.doc_link.length > 0 && (
                              <Link
                                className="border rounded-full border-gray-800 flex justify-center items-center text-[12px] px-2 py-1"
                                href={values.doc_link}
                              >
                                View Document
                              </Link>
                            )}
                            {values.official_website_link.length > 0 && (
                              <Link
                                className="border rounded-full border-gray-800 flex justify-center items-center text-[12px] px-2 py-1"
                                href={values.official_website_link}
                              >
                                Visit Website
                              </Link>
                            )}
                          </div>
                        ))}
                      <div className="flex justify-between items-center w-full sm:flex-1 ">
                        <div className=" flex justify-start sm:items-center gap-4">
                          {values.repository_link.length > 0 && (
                            <Link href={values.repository_link}>
                              <Image
                                className="w-6 h-auto"
                                src={github}
                                alt="github"
                              />
                            </Link>
                          )}
                          <div
                            className={`text-[16px] flex justify-start items-center gap-1 ${
                              values.status === "complete"
                                ? "text-green-500"
                                : "text-yellow-600"
                            }`}
                          >
                            <Image
                              src={
                                values.status === "complete" ? check : pending
                              }
                              alt="status"
                              className="w-4 h-auto "
                            />
                            {values.status.toUpperCase()}
                          </div>
                        </div>

                        <p className="bg-black text-white text-paragraph px-6 rounded-full py-1  ">
                          ${values.price}
                        </p>
                      </div>
                    </div>

                    <div className="mt-1 flex justify-center items-center">
                      {
                        <Image
                          alt="image preview"
                          src={imagePreview || ""}
                          width={500}
                          height={400}
                          className={`w-full  h-auto object-cover rounded-lg ${
                            imagePreview ? "block" : "hidden"
                          }`}
                        />
                      }
                    </div>
                    {/* <div className="w-full flex justify-start items-center flex-wrap gap-2 mb-2">
                      {values.tools_and_technologies.length > 0 &&
                        values.tools_and_technologies.map((item, index) => {
                          return (
                            <p
                              className="bg-gray-500 px-2 py-0.5 rounded-full text-white font-light text-[11px] inline-block"
                              key={index}
                            >
                              {item}
                            </p>
                          );
                        })}
                    </div> */}
                  </div>
                  <hr className="my-2" />

                  {/* project card end  */}
                  <div className="flex items-center justify-between">
                    <div className="flex justify-start gap-4 items-center">
                      <div className="flex items-center gap-1.5 group hover:bg-gray-200 px-3 transition-all cursor-pointer duration-300 rounded-lg py-2">
                        <Image
                          src={like}
                          alt="like"
                          width={20}
                          loading="lazy"
                          className="group-hover:-rotate-12 transition-all duration-300"
                        />
                        <p className="text-paragraph font-extralight opacity-60">
                          Like
                        </p>
                      </div>
                      <div
                        className={` items-center gap-1.5 group hover:bg-gray-200 px-3 transition-all cursor-pointer duration-300 rounded-lg py-2 ${
                          values.comment_allowed ? "flex" : "hidden"
                        }`}
                      >
                        <Image
                          src={comment}
                          alt="comment"
                          width={20}
                          loading="lazy"
                          className="group-hover:-rotate-12  transition-all duration-300 h-auto"
                        />
                        <p className="text-paragraph font-extralight opacity-60">
                          Comment
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 group hover:bg-gray-200 px-3 transition-all cursor-pointer duration-300 rounded-lg py-2">
                        <Image
                          src={share}
                          alt="share"
                          width={20}
                          loading="lazy"
                          className="group-hover:rotate-45  transition-all duration-300 h-auto"
                        />
                        <p className="text-paragraph font-extralight opacity-60">
                          Share
                        </p>
                      </div>
                    </div>
                    <div className="mr-2">
                      <button
                        type="submit"
                        className="py-1 px-4 bg-blue-700  text-white rounded-full"
                      >
                        {" "}
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProject;
