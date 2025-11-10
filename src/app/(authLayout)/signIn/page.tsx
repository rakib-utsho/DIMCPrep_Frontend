import SignInPage from "@/components/Auth/SignIn";
import React from "react";

import { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Signin to DIMCPrep | Access Your Mock Exams & Revision Tools",
  description:
    "Sign in to DIMCPrep to access 800+ expert questions and full mock exams . Continue your smart online prep for the Diploma in Immediate Care with ease.",
};

const page = () => {
  return (
    <div>
      <Navbar />
      <SignInPage />
    </div>
  );
};

export default page;
