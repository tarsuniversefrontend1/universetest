"use client";
import Image from "next/image";
import arrow from "../../../../Public/icons/register/arrow.svg";
import { useContext, useState } from "react";
import GeneralInformation from "@/components/Settings/GeneralInformation/GeneralInformation";
import Education from "@/components/Settings/GeneralInformation/Education/Education";
import ProfessionalExperience from "@/components/Settings/GeneralInformation/ProfessionalExperience/ProfessionalExperience";
import Skills from "@/components/Settings/GeneralInformation/Skills/Skills";
import Link from "next/link";


const GeneralInfo = () => {

  const [education, setEducation] = useState(false);
  const [experience, setExperience] = useState(false);
  const [skills, setSkills] = useState(false);

  const toogleSkills = () => {
    setSkills(!skills);
  };

  const toogleEducation = () => {
    setEducation(!education);
  };

  const toogleExperience = () => {
    setExperience(!experience);
  };

  return (
    <div className="pb-24 overflow-y-auto lg:mt-[6.3rem] mt-20  lg:w-[33rem] md:w-[32rem]">
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex items-center  lg:hidden gap-3">
          <Link href="/profile/">
            <Image
              src={arrow}
              width={14}
              className="rotate-90"
              alt="->"
            ></Image>
          </Link>
          <p className="text-xl ">General Info</p>
        </div>
        <div className="lg:mt-0 mt-2 flex flex-col w-full items-start gap-6">
          <div className="w-full">
            <p>Basic Info</p>
            <GeneralInformation />
          </div>

          <div className="w-full">
            <div
              onClick={toogleEducation}
              className="flex cursor-pointer items-center gap-3"
            >
              <p>Education</p>
              <Image
                src={arrow}
                height={12}
                width={12}
                alt="->"
                className={`trnasition-all duration-300 ${
                  education ? "" : "-rotate-90"
                }`}
              ></Image>
            </div>
            {education && (
              <>
                <Education />
              </>
            )}
          </div>

          <div className="w-full">
            <div
              onClick={toogleExperience}
              className="flex cursor-pointer items-center gap-3"
            >
              <p>Professional Expereinces</p>
              <Image
                src={arrow}
                height={12}
                width={12}
                alt="->"
                className={`trnasition-all duration-300 ${
                  experience ? "" : "-rotate-90"
                }`}
              ></Image>
            </div>

            {experience && (
              <>
                <ProfessionalExperience />
              </>
            )}
          </div>

          <div className="w-full">
            <div
              onClick={toogleSkills}
              className="flex cursor-pointer items-center gap-3"
            >
              <p>Skills</p>
              <Image
                src={arrow}
                height={12}
                width={12}
                alt="->"
                className={`trnasition-all duration-300 ${
                  skills ? "" : "-rotate-90"
                }`}
              ></Image>
            </div>

            {skills && (
              <>
                <Skills />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInfo
// settings - > generalInfo route