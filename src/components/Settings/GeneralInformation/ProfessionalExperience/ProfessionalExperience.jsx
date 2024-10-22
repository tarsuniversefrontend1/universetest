"use client";
import plus from "../../../../../assets/icons/settings/plus.png";
import arrow from "../../../../../assets/icons/register/arrow.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfessionalExperience = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(""); // State for the selected industry
  const [filteredData, setFilteredData] = useState([]); // To hold the filtered results

  const handleFocus = () => {
    setDropdownVisible(true);
  };

  const handleBlur = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    axios
      .get("/industry.json")
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

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSelectedIndustry(value);
    const filtered = data.filter((item) =>
      item.field.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered); // Update filtered data based on the input
  };

  const handleSelectIndustry = (item) => {
    setSelectedIndustry(item.field);
    setDropdownVisible(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return <div className="text-red-600 text-xs font-light">{error}</div>;

  return (
    <div>
      <div className="border mt-2 flex flex-col items-start gap-4 rounded-xl w-full p-3">
        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">Company name</p>
          <input
            type="text"
            placeholder="TARS Industries"
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
          />
        </div>
        <div className="flex w-full relative flex-col items-start gap-1">
          <p className="text-paragraph">Industry</p>
          <input
            type="text"
            placeholder="Search..."
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
            value={selectedIndustry}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
          />
          <Image
            loading="lazy"
            src={arrow}
            height={12}
            width={12}
            alt="->"
            className="absolute right-3 top-10"
          />
          {dropdownVisible && filteredData.length > 0 && (
            <div className="w-full bg-white flex items-start flex-col rounded-lg absolute z-[9999] top-16 overflow-y-auto shadow-sm shadow-gray-300 h-48">
              {filteredData.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-start px-3 hover:bg-gray-100 transition-all duration-300 py-2 text-xs font-light"
                  onMouseDown={() => handleSelectIndustry(item)} // Use onMouseDown to avoid losing focus
                >
                  {item?.field}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">Designation</p>
          <input
            type="text"
            placeholder="Frontend Developer"
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
          />
        </div>
        <div className="flex items-center gap-4 w-full">
          <div className="flex w-full flex-col items-start gap-1">
            <p className="text-paragraph">Joined</p>
            <input
              type="date"
              className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
            />
          </div>
          <div className="flex w-full flex-col items-start gap-1">
            <p className="text-paragraph">Timeline(Month)</p>
            <input
              type="text"
              placeholder="24"
              className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
            />
          </div>
        </div>
        <div className="flex cursor-pointer items-center gap-1.5">
          <Image src={plus} alt="plus" height={10} width={10} loading="lazy" />
          <button className="font-light text-xs">Add more</button>
        </div>
        <div className="w-full h-[1px] bg-gray-200"></div>
        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">Current Company name</p>
          <input
            type="text"
            placeholder="TARS Industries"
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
          />
        </div>
        <div className="flex w-full flex-col items-start gap-1">
          <p className="text-paragraph">Industry</p>
          <input
            type="text"
            placeholder="Technical Innovations and Research"
            className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
          />
        </div>
        <div className="flex items-center gap-4 w-full">
          <div className="flex w-full flex-col items-start gap-1">
            <p className="text-paragraph">Designation</p>
            <input
              type="text"
              placeholder="Frontend Developer"
              className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
            />
          </div>
          <div className="flex w-full flex-col items-start gap-1">
            <p className="text-paragraph">Joined</p>
            <input
              type="date"
              className="w-full focus:outline-none text-paragraph font-extralight px-3 rounded-md h-9 bg-white shadow-sm shadow-gray-300"
            />
          </div>
        </div>

        <div className="flex w-full  justify-end items-center mt-3 gap-4">
          <button className="border text-[12px] font-light border-gray-300 w-20 py-1 rounded-lg">
            Cancel
          </button>
          <button className="text-white text-[12px] font-light bg-blue-900 w-20 py-1 rounded-lg">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalExperience;
