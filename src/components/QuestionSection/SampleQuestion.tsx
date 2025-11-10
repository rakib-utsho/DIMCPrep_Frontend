"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CheckmarkImg from "@/assets/extra/checkmark-square.png";

type OptionId = "A" | "B" | "C" | "D" | "E";

interface QuestionData {
  id: string;
  question: string;
  options: { id: OptionId; label: string }[];
  correctAnswer: OptionId;
  explanation: string;
}

const questions: QuestionData[] = [
  {
    id: "q1",
    question:
      "A 65-year-old man presents with crushing chest pain radiating to his left arm. ECG shows ST-segment elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
    options: [
      { id: "A", label: "A. Left anterior descending artery (LAD)" },
      { id: "B", label: "B. Posterior descending artery" },
      { id: "C", label: "C. Left circumflex artery" },
      { id: "D", label: "D. Right coronary artery (RCA)" }, // ✅ Correct
      { id: "E", label: "E. Obtuse marginal artery" },
    ],
    correctAnswer: "D",
    explanation:
      "Right Coronary Artery (RCA), which supplies the inferior wall.",
  },
  {
    id: "q2",
    question:
      "After a failed intubation in a pregnant trauma patient, which rescue device is recommended in the Difficult Airway Society algorithm?",
    options: [
      { id: "A", label: "A. 2nd generation supraglottic airway" }, // ✅ Correct
      { id: "B", label: "B. First generation LMA" },
      { id: "C", label: "C. Oro-pharyngeal airway only" },
      { id: "D", label: "D. Surgical airway without attempt at adjunct" },
      { id: "E", label: "E. Nasal trumpets in both nostrils" },
    ],
    correctAnswer: "A",
    explanation:
      "Second-generation supraglottic devices provide a better seal and gastric drainage, offering the best rescue option according to Level Ia evidence.",
  },
];

const MultiSampleQuestion = () => {
  const [answers, setAnswers] = useState<Record<string, OptionId | null>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleOptionClick = (qId: string, optionId: OptionId) => {
    if (!submitted[qId]) {
      setAnswers({ ...answers, [qId]: optionId });
    }
  };

  const handleSubmit = (qId: string) => {
    if (answers[qId]) {
      setSubmitted({ ...submitted, [qId]: true });
      setTimeout(() => {
        setSubmitted((prev) => ({ ...prev, [qId]: false }));
        setAnswers((prev) => ({ ...prev, [qId]: null }));
      }, 30000);
    }
  };

  return (
    <div className="w-full bg-white py-8 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[100px] 2xl:px-[140px]">
      <motion.h2 className="text-xl md:text-4xl lg:text-5xl font-bold mx-auto text-center text-gray-800 p-2 md:p-4 lg:p-8 xl:p-12">
        Try Before You Buy: Sample DIMC Questions
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8 items-stretch">
        {questions.map((question, idx) => {
          const selected = answers[question.id];
          const isSubmitted = submitted[question.id];

          return (
            <div
              key={question.id}
              className="flex flex-col justify-between rounded-lg p-4 h-full"
            >
              <div className="flex flex-col flex-grow">
                <motion.h3
                  className="text-xl md:text-3xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                >
                  Example Question {idx + 1}
                </motion.h3>

                <p className="text-sm md:text-md text-gray-700 mb-4">
                  {question.question}
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {question.options.map((option) => {
                    const isCorrect = option.id === question.correctAnswer;
                    const isSelected = selected === option.id;

                    let optionClass =
                      "p-3 sm:p-2 text-sm rounded cursor-pointer transition-all border flex items-center justify-between";

                    if (isSubmitted) {
                      if (isCorrect) {
                        optionClass += " border-green-500 text-green-600";
                      } else if (isSelected) {
                        optionClass += " border-red-500 text-red-500";
                      } else {
                        optionClass += " border-gray-300";
                      }
                    } else {
                      optionClass += isSelected
                        ? " border-[var(--secondary)] bg-[var(--primary)] text-black"
                        : " border-gray-300 hover:bg-gray-100";
                    }

                    return (
                      <motion.div
                        key={option.id}
                        className={optionClass}
                        onClick={() =>
                          handleOptionClick(question.id, option.id)
                        }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span>{option.label}</span>
                        {isSubmitted && (
                          <>
                            {isCorrect && (
                              <Image
                                src={CheckmarkImg}
                                title="Correct"
                                alt="Correct"
                                width={24}
                                height={24}
                              />
                            )}
                            {!isCorrect && isSelected && (
                              <span className="text-red-500 text-xl ml-2">
                                ❌
                              </span>
                            )}
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {isSubmitted && (
                  <motion.div
                    className="text-base text-gray-700 p-3 mt-3 border border-gray-200 rounded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <strong>Explanation:</strong> <br />
                    {question.explanation}
                  </motion.div>
                )}
              </div>

              <div className="mt-6">
                <motion.button
                  onClick={() => handleSubmit(question.id)}
                  disabled={!selected || isSubmitted}
                  className="py-2 px-6 rounded-md font-medium text-white bg-[var(--secondary)]
      hover:bg-white hover:text-[var(--secondary)] hover:shadow-lg border border-[var(--secondary)]
      transition-all duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Submit
                </motion.button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSampleQuestion;
