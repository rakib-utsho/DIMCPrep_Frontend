import React from "react";
import TermsSection from "@/components/PolicySection/TermsSection";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIMCPrep Disclaimer | For Educational Purposes Only",
  description:
    "Read the DIMCPrep disclaimer outlining educational purpose, non-affiliation, and liability limits. Not a substitute for medical advice or official guidance.",
};

const page = () => {
  return (
    <div>
      <TermsSection />
    </div>
  );
};

export default page;
