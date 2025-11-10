import PrivecySection from "@/components/PolicySection/PrivecySection";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DIMCPrep Privacy Policy | Know & Protect Your Data Rights",
  description:
    "Learn how DIMCPrep collects, uses, and protects your data. Understand your privacy rights and how to contact us regarding personal information or concerns.",
};

const page = () => {
  return (
    <div>
      <PrivecySection />
    </div>
  );
};

export default page;
