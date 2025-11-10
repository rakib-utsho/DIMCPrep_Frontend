"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion
import ProgressImg from "@/assets/progress/ProgressImg.png";
import Arrow from "@/assets/extra/mingcute_right-fill.png";

const ProgressDashboard = () => {
  return (
    <section className="w-full py-10 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[100px] bg-white">
      <motion.div
        className="flex flex-col lg:flex-row items-center gap-10 sm:gap-20 bg-white shadow-md rounded-2xl p-6 md:p-8 min-h-[450px] sm:min-h-[540px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Side: Text */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h4
            className="text-2xl md:text-2xl lg:text-2xl xl:text-4xl font-bold text-gray-800 mb-4 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Boost Your Progress with <br className="hidden lg:block" />
            Performance Growth Feedback
          </motion.h4>

          <motion.p
            className="text-gray-600 mb-6 text-sm md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <b>Our Mission </b> <br />
            We’ve created DIMC Prep because there were no online revision
            resources dedicated to the DipIMC, despite it being the most
            prestigious postgraduate exam in pre-hospital emergency medicine.
            Our goal is to bridge that gap with a highly specialised platform
            that empowers frontline professionals to succeed.
          </motion.p>
          <motion.p
            className="text-gray-600 mb-6 text-sm md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <b>Start Your DipIMC Preparation Today</b> <br />
            You’ve worked hard to reach this point. Let us help you take the
            next step in your professional journey. With DIMC Prep, you get
            focused, reliable, and expertly crafted questions that will sharpen
            your skills and maximise your exam performance.
          </motion.p>
          <motion.p
            className="text-gray-600 mb-6 text-sm md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <b>Call to Action</b> <br />
            Looking for Diploma in Immediate Medical Care past papers or a
            reliable question bank for DipIMC? Start now with DIMC Prep, the
            only educational platform tailored to help you succeed in the
            Diploma in Immediate Medical Care exam.
          </motion.p>

          {/* <motion.ul
            className="space-y-4 text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {[
              "View your performance trends and spot areas that need improvement with clear, simple analytics.",
              "Get feedback that explains your mistakes and helps you learn from them faster.",
              "See your growth in real time and stay driven with visible, steady progress.",
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.3 }}
              >
                <Image
                  src={Arrow}
                  alt="Arrow"
                  title="Arrow"
                  width={20}
                  height={20}
                  className="mt-1"
                />
                <span className="text-sm md:text-sm">{item}</span>
              </motion.li>
            ))}
          </motion.ul> */}
        </motion.div>

        {/* Right Side: Image */}
        <motion.div
          className="flex-1 flex items-center justify-center lg:justify-end shadow-lg rounded-xl overflow-hidden"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-full h-full">
            <Image
              src={ProgressImg}
              alt="Performance Growth Feedback"
              title="Performance Growth Feedback"
              className="rounded-xl w-full h-full object-contain"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProgressDashboard;
