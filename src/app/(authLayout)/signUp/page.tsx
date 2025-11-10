import SignupPage from "@/components/Auth/SignUp";
import React from "react";

import { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "DIMCPrep Signup | Start Diploma in Immediate Care Prep",
  description:
    "Signup account on DIMCPrep and get access to 1200+ expert questions, 3 full mock exams, and smart tools designed to support your DIMC exam preparation.",
};

const page = () => {
  return (
    <div>
      <Navbar />
      <SignupPage />
    </div>
  );
};

export default page;
