"use client";
import Link from "next/link";
import React from "react";

const PrivecySection = () => {
  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[100px] py-12">
        <div className="prose max-w-none text-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <div className="bg-[#CFF8F1] border-l-4 border-[#166F6D] p-4 mb-8 text-start">
            <p className="text-[#166F6D]">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <section className="mb-8 text-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 mb-4">
              DIMCPrep ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our online
              question bank platform for preparing for the Diploma in Immediate
              Care.
            </p>
            <p className="text-gray-600 mb-4">
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              platform.
            </p>
          </section>

          {/* Other sections remain the same until contact sections */}

          <section className="mb-8 text-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your Data Protection Rights
            </h2>
            <p className="text-gray-600 mb-4">
              Depending on your location, you may have certain rights regarding
              your personal data, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 text-start">
              <li>The right to access, update, or delete your information</li>
              <li>The right of rectification</li>
              <li>The right to object</li>
              <li>The right of restriction</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="text-gray-600 mb-4">
              If you wish to exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:info@dimcprep.com"
                className="text-blue-600 hover:text-blue-800"
                title="Mail Address"
              >
                info@dimcprep.com
              </a>
              .
            </p>
          </section>

          <section className="mb-8 text-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 text-start">
              <li>
                By email:{" "}
                <a
                  href="mailto:info@dimcprep.com"
                  className="text-blue-600 hover:text-blue-800"
                  title="Mail Address"
                >
                  info@dimcprep.com
                </a>
              </li>
              <li>
                By visiting the{" "}
                <Link
                  href={"/contactUs"}
                  className="font-bold"
                  title="Contact Page"
                >
                  contact page
                </Link>{" "}
                on our website
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivecySection;
