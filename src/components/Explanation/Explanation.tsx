"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ExplanationItem {
  title: string;
  question: string;
  answer: string; // Correct answer
  submittedAnswer: string; // The answer submitted by the user
  explanation: string;
}

interface ExplanationProps {
  initialIndex?: number;
  customExplanations?: ExplanationItem[];
}

export default function Explanation({
  initialIndex = 0,
  customExplanations = [],
}: ExplanationProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = () => setIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setIndex((prev) => Math.min(customExplanations.length - 1, prev + 1));

  if (isLoading) {
    return (
      <div className="w-full bg-white p-6 rounded-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (customExplanations.length === 0) {
    return (
      <div className="w-full bg-white p-6 rounded-lg text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No explanations available
        </h2>
        <p className="text-gray-500 mt-2">
          The explanations for this exam could not be loaded.
        </p>
      </div>
    );
  }

  const current = customExplanations[index];

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <h1 className="text-sm sm:text-base font-bold text-gray-800 mb-4">
        {current.title}
      </h1>

      <div className="mb-6">
        <p className="text-sm sm:text-base text-justify font-medium text-gray-700 mb-2">
          {current.question}
        </p>

        <div className="bg-green-50 p-3 rounded-md mb-4">
          <p className="text-sm sm:text-base text-justify font-semibold text-green-700">
            {current.answer}
          </p>
        </div>

        <div className="bg-yellow-50 p-3 rounded-md mb-4">
          <p className="font-semibold text-yellow-700 text-sm sm:text-base text-justify">
            {current.submittedAnswer}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
            Explanation:
          </h3>
          <div className="text-gray-700 text-sm sm:text-base text-justify">
            {current.explanation ? (
              <div
                style={{
                  overflowY: "auto",
                  maxHeight: "300px",
                }}
                dangerouslySetInnerHTML={{ __html: current.explanation }}
                className="max-h-[300px] sm:max-h-[400px] overflow-auto"
              />
            ) : (
              <span className="text-gray-500 italic">
                No explanation provided for this question. Please check back
                later or contact support.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons container */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={index === 0}
          className={`flex items-center gap-2 px-4 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 rounded-md cursor-pointer text-sm sm:text-sm nd:text-base ${
            index === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
        >
          <FaArrowLeft /> Previous
        </button>

        <button
          onClick={handleNext}
          disabled={index === customExplanations.length - 1}
          className={`flex items-center gap-2 px-4 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 rounded-md cursor-pointer text-sm sm:text-sm nd:text-base ${
            index === customExplanations.length - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-teal-500 text-white hover:bg-teal-600"
          }`}
        >
          Next <FaArrowRight />
        </button>
      </div>

      <div className="mt-4 text-center text-sm sm:text-base text-gray-500">
        Question {index + 1} of {customExplanations.length}
      </div>
    </div>
  );
}
