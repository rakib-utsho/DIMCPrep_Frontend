import Image from "next/image";
import React from "react";
import { MdPhoneIphone } from "react-icons/md";
import ClockImg from "@/assets/features/clock.png";
import Arrowtree from "@/assets/features/arrowTree.png";
import BookImg from "@/assets/features/book.png";
import NoteImg from "@/assets/features/note.png";
import BringImg from "@/assets/features/brain.png";

const FeaturesSection = () => {
  return (
    <section className="w-full py-10 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-[100px] 2xl:px-[100px] bg-white">
      <div className="w-full">
        <div className="text-center mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Our online question bank has features to{" "}
            <br className="hidden xl:block" /> enrich your learning experience.
          </h3>
          <div className="flex justify-center mb-6">
            <svg
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10H10L13 3L18 17L23 7L26 10H40"
                stroke="#20B2AA"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Unified grid layout with all 6 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className="flex items-start gap-6 sm:gap-4 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 rounded-lg cursor-pointer">
            <Image
              src={ClockImg}
              alt="clock"
              title="clock"
              className="w-14 h-14 flex-shrink-0"
            />
            <div>
              <h5 className="text-xl md:text-2xl font-extrabold mb-3">
                Time Allocated
              </h5>
              <p className="text-sm md:text-base text-gray-700">
                Test yourself against the clock in a timed exam, or use revision
                mode for casual revision.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-start gap-6 sm:gap-4 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 rounded-lg cursor-pointer">
            <Image
              src={Arrowtree}
              alt="High-Impact Questions"
              title="High-Impact Questions"
              className="w-14 h-14 flex-shrink-0"
            />
            <div>
              <h5 className="text-xl md:text-2xl font-extrabold mb-3">
                High-Impact Questions
              </h5>
              <p className="text-sm md:text-base text-gray-700">
                Make the most of your revision time with carefully curated,
                high-yield questions that focus on what matters most.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-start gap-6 sm:gap-4 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 rounded-lg cursor-pointer">
            <Image
              src={BookImg}
              alt="Custom Question Selection"
              title="Custom Question Selection"
              className="w-14 h-14 flex-shrink-0"
            />
            <div>
              <h5 className="text-xl md:text-2xl font-extrabold mb-3">
                Custom Question Selection
              </h5>
              <p className="text-sm md:text-base text-gray-700">
                Tailor your practice by filtering questions based on topic or
                category to suit your revision needs.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-start gap-6 sm:gap-4 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 rounded-lg cursor-pointer">
            <Image
              src={NoteImg}
              alt="Key Learning Highlights"
              title="Key Learning Highlights"
              className="w-14 h-14 flex-shrink-0"
            />
            <div>
              <h5 className="text-xl md:text-2xl font-extrabold mb-3">
                Key Learning Highlights
              </h5>
              <p className="text-sm md:text-base text-gray-700">
                Each question targets a core concept. At the end of every
                question, you'll receive a concise summary of the key points to
                help consolidate your understanding and boost retention.
              </p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="flex items-start gap-6 sm:gap-4 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 rounded-lg cursor-pointer">
            <Image
              src={BringImg}
              alt="Performance Insights"
              title="Performance Insights"
              className="w-14 h-14 flex-shrink-0"
            />
            <div>
              <h5 className="text-xl md:text-2xl font-extrabold mb-3">
                Performance Insights & Peer Benchmarking
              </h5>
              <p className="text-sm md:text-base text-gray-700">
                Track your progress with detailed analytics that show how you're
                performing—and how you compare with others. Get a clear sense of
                your readiness and likelihood of passing.
              </p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="flex items-start gap-6 sm:gap-4 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 rounded-lg cursor-pointer">
            <div className="w-14 h-14 flex-shrink-0 text-[#20B2AA]">
              <MdPhoneIphone className="w-full h-full" />
            </div>
            <div>
              <h5 className="text-xl md:text-2xl font-extrabold mb-3">
                Native Web App
              </h5>
              <p className="text-sm md:text-base text-gray-700">
                This website is a native web app and fully integrated for
                Android and iOS users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
