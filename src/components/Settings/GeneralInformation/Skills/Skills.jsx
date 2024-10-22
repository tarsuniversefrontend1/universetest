import { useState } from "react";
import Image from "next/image"; // Ensure you have the correct import for your Image component
import cross from "../../../../../Public/icons/register/cross.svg";
import send from "../../../../../Public/icons/settings/send.png";

const SkillTaggingSystem = () => {
  const [skills, setSkills] = useState([
    "HTML",
    "Typescript",
    "JavaScript",

  ]);

  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input) {
      e.preventDefault(); 
      const trimmedInput = input.trim(); 
      if (!skills.includes(trimmedInput) && trimmedInput) {
        setSkills([...skills, trimmedInput]);
      }
      setInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };
  const submitSkill = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !skills.includes(trimmedInput)) {
      setSkills([...skills, trimmedInput]);
      setInput("");
    }
  };

  return (
    <div className="w-full mt-2 flex flex-wrap bg-white rounded-xl gap-3 shadow-sm shadow-gray-300 p-3 items-center h-full">
      {skills.map((skill, index) => (
        <div className="inline-block" key={index}>
          <div className="flex relative items-center bg-gray-100 px-3 py-1 rounded-lg">
            <p className="text-[10px] font-light">{skill}</p>
            <Image
              src={cross}
              alt="cross"
              loading="lazy"
              onClick={() => removeSkill(skill)}
              className="absolute right-0 top-0 cursor-pointer hover:scale-110 transition-all duration-300"
              height={7}
              width={7}
            />
          </div>
        </div>
      ))}

      <div className="w-full relative">
        <textarea
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill & Enter"
          className="w-full text-xs font-light focus:outline-none mt-2 p-2 border rounded-lg resize-none"
          rows={1}
        />
        <Image
          onClick={submitSkill}
          src={send}
          alt="send"
          className="md:hidden  absolute right-2.5 top-4  cursor-pointer hover:scale-110 transition-all duration-300"
          height={15}
          width={18}
        ></Image>
      </div>
      <div className="flex w-full  justify-end items-center  gap-4">
        <button className="border text-[12px] font-light border-gray-300 w-20 py-1 rounded-lg">
          Cancel
        </button>
        <button className="text-white text-[12px] font-light bg-blue-900 w-20 py-1 rounded-lg">
          Save
        </button>
      </div>
    </div>
  );
};

export default SkillTaggingSystem;
