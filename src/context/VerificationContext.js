// context/VerificationContext.js
"use client";
import React, { createContext, useContext, useState } from "react";

const VerificationContext = createContext();

export const VerificationProvider = ({ children }) => {
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <VerificationContext.Provider
      value={{ verificationCode, setVerificationCode }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => useContext(VerificationContext);
