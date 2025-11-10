"use client";
import React from "react";

const TermsSection = () => {
  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[100px] py-12">
        <div className="prose max-w-none text-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>

          {/* Show Date */}
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
              Educational Purpose
            </h2>
            <p className="text-gray-600 mb-4">
              DIMCPrep is an educational platform designed to help healthcare
              professionals prepare for their Diploma in Immediate Care. The
              content provided is for educational and informational purposes
              only. 
              This website is not affiliated to the Royal College of
              Surgeons of Edinburgh nor any other regulatory body. The content
              is not medical advice, and is purely for educational and
              recreational purposes
            </p>
            <p className="text-gray-600 mb-4">
              While we strive to provide accurate and up-to-date information,
              the field of medicine is constantly evolving. The question bank
              should be used as a study aid and not as a substitute for
              professional medical education, training, or judgment.
            </p>
          </section>

          <section className="mb-8 text-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Not Medical Advice
            </h2>
            <p className="text-gray-600 mb-4">
              The content on DIMCPrep is not intended to be a substitute for
              professional medical advice, diagnosis, or treatment. Always seek
              the advice of your physician or other qualified health provider
              with any questions you may have regarding a medical condition.
            </p>
            <p className="text-gray-600 mb-4">
              Never disregard professional medical advice or delay in seeking it
              because of something you have read on this platform.
            </p>
          </section>

          <section className="mb-8 text-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Accuracy of Information
            </h2>
            <p className="text-gray-600 mb-4">
              We make every effort to ensure the accuracy of the information
              provided in our question bank. However, we do not warrant that the
              information will be error-free, complete, or up-to-date at all
              times.
            </p>
            <p className="text-gray-600 mb-4">
              Medical knowledge and best practices change frequently. Users
              should verify any information with current medical literature and
              guidelines before applying it in professional practice.
            </p>
          </section>

          <section className="mb-8 text-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-4">
              DIMCPrep, its owners, employees, and affiliates shall not be
              liable for any direct, indirect, incidental, consequential, or
              punitive damages arising out of your access to or use of the
              platform.
            </p>
            <p className="text-gray-600 mb-4">
              By using DIMCPrep, you agree to use the content at your own risk
              and discretion.
            </p>
          </section>

          <section className="mb-8 text-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Exam Preparation
            </h2>
            <p className="text-gray-600 mb-4">
              While DIMCPrep aims to help users prepare for their Diploma in
              Immediate Care, we do not guarantee that using our platform will
              result in passing any examination. Success in examinations depends
              on multiple factors beyond our control.
            </p>
            <p className="text-gray-600 mb-4">
              Our question bank is designed to supplement your studies and
              should be used alongside other educational resources and practical
              training.
            </p>
          </section>

          <section className="mb-8 text-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Changes to Disclaimer
            </h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify this disclaimer at any time.
              Changes will be effective immediately upon posting on the
              platform. Your continued use of DIMCPrep after any changes
              indicates your acceptance of the modified disclaimer.
            </p>
          </section>

          <section className="mb-8 text-start">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this disclaimer, please contact us
              at{" "}
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
        </div>
      </div>
    </div>
  );
};

export default TermsSection;
