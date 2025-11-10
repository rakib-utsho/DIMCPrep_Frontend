"use client";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { useSendFeedbackMutation } from "@/redux/api/contact/contactApi";
import { toast } from "sonner";

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sendFeedback, { isLoading }] = useSendFeedbackMutation();

  interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  interface HandleChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {}

  const handleChange = (e: HandleChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

  interface SendFeedbackResponse {
    // Define the expected response shape here if known, otherwise use 'any'
    [key: string]: any;
  }

  const handleSubmit = async (e: HandleSubmitEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response: SendFeedbackResponse = await sendFeedback(formData).unwrap();
      toast.success("Feedback sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: unknown) {
      toast.error("Failed to send feedback. Please try again.");
      console.error("Error sending feedback:", error);
    }
  };

  return (
    <section className="bg-[#f0fbfb] py-6 sm:py-10 mt-10 min-h-screen">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] 2xl:px-[120px] h-full">
        {/* Left Side - Contact Info */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="mb-6 lg:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Have Questions? Reach Out to Us
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600">
              Please email us with any concerns, feedback, or suggestions. We
              will aim to reply at the earliest opportunity.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white py-4 px-6 rounded-xl shadow-md max-w-md mx-auto lg:mx-0">
            <div className="p-2 bg-[#CFF8F1] rounded-lg">
              <CiMail className="text-3xl text-[#20B2AA]" />
            </div>
            <div className="flex flex-col text-left">
              <h2 className="text-base sm:text-lg font-semibold mb-1">
                Send E-Mail
              </h2>
              <a
                href="mailto:info@dimcprep.com"
                className="text-gray-500 underline text-sm sm:text-base"
              >
                info@dimcprep.com
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <form onSubmit={handleSubmit} className="bg-[#c5f7f4] rounded-lg p-6 sm:p-8 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Get in Touch
            </h2>

            <div className="flex flex-col gap-3 sm:gap-4">
              <div>
                <label className="block mb-1 sm:mb-2 text-gray-700 font-medium">
                  Full name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 sm:mb-2 text-gray-700 font-medium">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 sm:mb-2 text-gray-700 font-medium">
                  Subject*
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="feedback">Feedback</option>
                  <option value="support">Support</option>
                  <option value="inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 sm:mb-2 text-gray-700 font-medium">
                  Message*
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write about your project"
                  className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 sm:mt-4 bg-teal-500 hover:bg-teal-800 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;