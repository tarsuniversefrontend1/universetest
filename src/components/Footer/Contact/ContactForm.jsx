"use client";
import React from "react";

const ContactForm = () => {
  return (
    <div className="py-10 bg-white rounded-lg md:rounded-xl lg::rounded-3xl  px-8 ">
      <h2 className="sf-pro-display text-[21px] font-bold mb-4 -mt-4">
        Send a Message
      </h2>
      <form className=" flex flex-col gap-5">
        <div className=" w-full">
          <input
            type="text"
            name="name"
            placeholder="Name"
            id=""
            className="px-3 focus:outline-none w-full  text-[15px] font-extralight border-none text-black bg-slate-100  h-10 rounded-md"
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            id=""
            className="px-3 focus:outline-none w-full  text-[15px] font-extralight border-none text-black bg-slate-100  h-10 rounded-lg"
          />
        </div>
        <div className=" w-full">
          <textarea
            name=""
            id=""
            rows="4"
            placeholder="Write your Message"
            className="px-3 py-2 focus:outline-none w-full text-[15px] font-extralight border border-none text-black bg-slate-100  rounded-lg"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full font-bold text-white sf-pro-display  focus:outline-none h-10 rounded-md bg-black"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
