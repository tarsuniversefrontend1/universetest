"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import blankUser from "../../../../Public/icons/blankUser.png";
import study from "../../../../Public/icons/profile/study.png";
import company from "../../../../Public/icons/profile/company.png";
import location from "../../../../Public/icons/profile/location.svg";
import pending from "../../../../Public/icons/profile/pending.svg";
import close from "../../../../Public/icons/register/cross.svg";
import profileCheck from "../../../../Public/icons/profile/profileCheck.svg";
import connect from "../../../../Public/icons/othersProfile/connect.svg";
import lock from "../../../../Public/icons/othersProfile/lock.svg";
import dot from "../../../../Public/icons/home/timeline/more.png";
import { UserContext } from "@/lib/UserProvider/UserProvider";

const LeftWidget = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnectionCancelModalOpen, setIsConnectionCancelModalOpen] =
    useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connected");
  const {
    user: { id },
  } = useContext(UserContext);
  const [connectionPopUp, setConnectionPopUp] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const setConnections = async () => {};

  useEffect(() => {
    if (user.friends?.includes(id)) {
      setConnectionStatus("connected");
    } else {
      setConnectionStatus("connect");
    }
  }, []);

  const handleConnection = async () => {
    if (connectionStatus === "connect") {
      setConnectionStatus("pending");
    } else {
      setIsConnectionCancelModalOpen(true);
    }
  };

  const withDrawRequest = () => {
    setConnectionStatus("connect");
    setIsConnectionCancelModalOpen(false);
  };

  return (
    <div className="sm:w-[20rem] w-full mx-auto lg:w-full">
      <div className="shadow-sm shadow-gray-300 rounded-b-xl bg-white relative p-5">
        <div className="relative w-44">
          <Image
            src={user?.profileImageURL?.String || blankUser}
            alt="Profile image"
            width={400}
            height={400}
            className="border-white object-cover border-4 rounded-full object-top h-44 w-full absolute -top-28 mx-auto lg:left-8 cursor-pointer"
            onClick={handleImageClick}
          />
        </div>

        <div className="flex flex-col items-start gap-1 mt-20">
          <div className="flex w-full items-center justify-between gap-2">
            <p className="text-2xl">
              {user?.firstname} {user?.lastname}
            </p>
          </div>
          <p className="text-[16px] font-extralight">
            {user?.professiona?.designation || "Student"}
          </p>
          {user?.biodata && (
            <p className="text-paragraph font-extralight mt-2">
              &apos; {user?.biodata} &apos;
            </p>
          )}
          {user?.profession?.company_name && (
            <div className="flex items-center gap-2 mt-2 opacity-65">
              <Image
                src={company}
                alt="company"
                width={18}
                height={18}
                className="mx-auto"
              />
              <p className="text-paragraph font-extralight">
                {user?.profession?.company_name}
              </p>
            </div>
          )}
          {user?.education?.current_institution && (
            <div className="flex items-center gap-2 mt-1 opacity-65">
              <Image
                src={study}
                alt="study"
                width={18}
                height={18}
                className="mx-auto"
              />
              <p className="text-paragraph font-extralight">
                {user?.education?.current_institution}
              </p>
            </div>
          )}
          {user?.lives_in && (
            <div className="flex items-start gap-1 md:gap-2 mt-1 opacity-65">
              <Image
                src={location}
                alt="location"
                width={12}
                height={12}
                className="mx-auto mt-[3px]"
              />
              <p className="text-paragraph font-extralight">{user?.lives_in}</p>
            </div>
          )}
        </div>

        <div className="flex text-blue-800 text-paragraph font-extralight items-center gap-2 mt-3">
          <p>{user?.followers || 0} Followers</p>
          <div className="h-1 w-1 rounded-full bg-blue-900"></div>
          <p>{user?.friends || 0} Connections</p>
        </div>

        <div className="flex items-center w-full mt-3 gap-3">
          <div className="flex flex-col items-center w-full py-2.5 rounded-lg bg-gray-100">
            <p className="text-paragraph">Projects</p>
            <p className="text-paragraph">{user?.projects?.length || 0}</p>
          </div>
          <div className="flex flex-col items-center w-full py-2.5 rounded-lg bg-gray-100">
            <p className="text-paragraph">Wallet</p>
            <Image src={lock} alt="wallet" width={18} loading="lazy" />
          </div>
        </div>

        <div className="flex mt-4 w-full items-center gap-3">
          <div
            onClick={handleConnection}
            className="flex cursor-pointer w-full mx-auto text-center justify-center items-center gap-1 bg-gray-200 rounded-lg text-paragraph px-4 py-2.5 relative"
          >
            {connectionStatus === "connect" && (
              <>
                <Image src={connect} width={14} alt="+" loading="lazy" />
                <button className="text-xs">Connect</button>
              </>
            )}
            {connectionStatus === "connected" && (
              <div className="flex gap-1.5 items-center justify-center">
                <Image
                  src={profileCheck}
                  width={14}
                  alt="pending"
                  loading="lazy"
                />
                <button className="text-xs">Connected</button>
              </div>
            )}
            {connectionStatus === "pending" && (
              <div className="flex gap-1.5 items-center">
                <Image src={pending} width={12} alt="+" loading="lazy" />
                <button className="text-xs">Pending</button>
              </div>
            )}
          </div>
          <div className="flex cursor-pointer w-full mx-auto text-center justify-center items-center gap-1 bg-blue-800 text-white rounded-lg text-paragraph px-4 py-2.5">
            <button className="text-xs">Message</button>
          </div>
          <Image
            className="w-6 ml-auto cursor-pointer"
            src={dot}
            width={27}
            height={25}
            loading="lazy"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed w-full h-full inset-0 bg-black bg-opacity-90 z-[999999] flex justify-center items-center">
          <div className="relative">
            <Image
              src={user?.profileImageURL || blankUser}
              alt="Full view profile image"
              width={600}
              height={600}
              className="rounded-lg w-full h-[98vh]"
            />
            <button
              className="fixed top-3 right-3 bg-white px-2.5 py-1 rounded-full text-black"
              onClick={handleCloseModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {isConnectionCancelModalOpen && (
        <div className="fixed w-screen h-screen inset-0 bg-opacity-90 z-[999999] flex justify-center items-center ">
          <div
            className="absolute bg-black  opacity-60kmd: opacity-60 inset-0 z-[99999]"
            onClick={() => setIsConnectionCancelModalOpen(false)}
          />
          <div className="absolute top-1/4 justify-center z-[9999999]">
            <div className="w-[330px] md:w-[430px]  rounded-lg bg-white pb-4">
              <div className="flex justify-between items-center  p-4">
                <h2 className="text-miniTItle font-medium">
                  Withdraw invitation
                </h2>
                <Image
                  src={close}
                  onClick={() => setIsConnectionCancelModalOpen(false)}
                  className="cursor-pointer"
                  alt="X"
                />
              </div>
              <div className="text-paragraph font-extralight text-gray-900  p-4 border-t border-b border-gray-300 ">
                {connectionStatus === "pending"
                  ? "Are you sure you want to withdraw your connection request?"
                  : `Are you sure you want to remove`}
                {connectionStatus !== "pending" && (
                  <span className="font-bold">
                    {" "}
                    {user?.firstname} {user?.lastname}{" "}
                  </span>
                )}
                {connectionStatus !== "pending" && "from your connection?"}
              </div>
              <div className="flex flex-row justify-end items-center gap-4 mt-4 ">
                <div
                  onClick={() => setIsConnectionCancelModalOpen(false)}
                  className="text-blue-800 border border-blue-800 rounded-lg px-3  py-1.5 cursor-pointer text-paragraph"
                >
                  Cancel
                </div>
                <div
                  onClick={withDrawRequest}
                  className={`text-white ${
                    connectionStatus === "pending"
                      ? "bg-blue-800"
                      : "bg-rose-700"
                  } bg-blue-800 rounded-lg px-3 md:px-4 py-1.5 md:py-2 mr-4 cursor-pointer text-paragraph`}
                >
                  {connectionStatus === "pending" ? "Withdraw" : "Remove"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftWidget;
