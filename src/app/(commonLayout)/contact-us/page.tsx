import ContactComponent from "@/components/ContactComponent/ContactComponent";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact DIMCPrep | Get in Touch for Support and Inquiries",
  description:
    "Need help or have questions about DIMCPrep? Reach out to our support team through our contact form or email. We're here to assist with your exam prep journey.",
  keywords: [
    "Contact DIMCPrep",
    "DIMC support",
    "Emergency medical contact",
    "Immediate care help",
    "DIMCPrep contact page",
  ],
};

const page = () => {
  return (
    <div>
      <ContactComponent />
    </div>
  );
};

export default page;
