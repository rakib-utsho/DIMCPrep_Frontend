"use client";

import {
  GetQuestionsResponse,
  QuestionOption,
  useSubmitExamMutation,
  useSubmitSingleQuestionMutation,
} from "@/redux/api/exam/examApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "sonner";

// Utility function to shuffle options
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Questions = () => {
  const searchParams = useSearchParams();
  const timePerTestString = searchParams.get("timePerTest");
  const questionCount = searchParams.get("questionCount");
  const feedBackSlection = searchParams.get("feedback");
  const questionMode = searchParams.get("mode");

  const timePerTest =
    timePerTestString && questionCount
      ? parseInt(timePerTestString) * parseInt(questionCount)
      : 0;

  const questions: GetQuestionsResponse = useSelector(
    (state: any) => state.quiz.quizzes
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuestionOption | null>(
    null
  );
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerTest);
  const [timerActive, setTimerActive] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [submitAnswer] = useSubmitSingleQuestionMutation();
  const [submitExam, { isLoading }] = useSubmitExamMutation();
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());

  const [answeredQuestions, setAnsweredQuestions] = useState<
    Map<number, boolean>
  >(new Map());
  const [selectedOptionsMap, setSelectedOptionsMap] = useState<
    Map<number, QuestionOption | null>
  >(new Map());
  const [correctAnswersMap, setCorrectAnswersMap] = useState<
    Map<number, boolean>
  >(new Map());

  const question = useMemo(() => {
    return questions?.questions?.[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  const isCorrect = selectedOption?.text === question?.correctOption;
  const isAlreadyAnswered = answeredQuestions.has(currentQuestionIndex);

  useEffect(() => {
    const previousAnswer = selectedOptionsMap.get(currentQuestionIndex) || null;
    setSelectedOption(previousAnswer);
    setAnswered(isAlreadyAnswered);
    setShowResult(isAlreadyAnswered);
    setQuestionStartTime(new Date());
  }, [currentQuestionIndex, selectedOptionsMap, answeredQuestions]);

  useEffect(() => {
    if (questionMode === "TIMED" && timerActive && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timerActive, timeLeft, questionMode]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} ${min === 1 ? "minute" : "minutes"}${
      sec ? ` ${sec}s` : ""
    } remaining`;
  };

  const handleOptionClick = (option: QuestionOption) => {
    if (!timerActive || isAlreadyAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (
      !answered &&
      selectedOption &&
      !isSubmitting &&
      question &&
      !answeredQuestions.has(currentQuestionIndex)
    ) {
      setIsSubmitting(true);
      const endTime = new Date();
      const durationSeconds =
        questionMode === "REVISION"
          ? 0
          : Math.floor(
              (endTime.getTime() - questionStartTime.getTime()) / 1000
            );

      try {
        const res = await submitAnswer({
          examId: questions.examId,
          questionId: question.id,
          selectedOptionId: selectedOption.id,
          startTime: questionStartTime.toISOString(),
          endTime: endTime.toISOString(),
          duration: durationSeconds,
        }).unwrap();

        if (res?.success) {
          setAnswered(true);
          setAnsweredQuestions(
            new Map(answeredQuestions.set(currentQuestionIndex, true))
          );
          setSelectedOptionsMap(
            new Map(
              selectedOptionsMap.set(currentQuestionIndex, selectedOption)
            )
          );
          setCorrectAnswersMap(
            new Map(correctAnswersMap.set(currentQuestionIndex, isCorrect))
          );

          setTimeout(() => {
            setShowResult(true);
          }, 500);
        } else {
          toast.error("Answer submission failed. Please try again.");
        }
      } catch (error) {
        console.error("Failed to submit answer:", error);
        toast.warning(
          "Network error. Please check your connection and try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions?.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    try {
      await submitExam({ examId: questions?.examId }).unwrap();
      toast.success("Exam Submitted Successfully");
      router.replace(`/result/${questions?.examId}`);
    } catch (error) {
      console.error("Failed to submit exam:", error);
      toast.error("Failed to finish exam. Try again.");
    }
  };

  // 🔀 Randomized options
  const shuffledOptions = useMemo(() => {
    return question?.options ? shuffleArray(question.options) : [];
  }, [question]);

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading question...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            width={166}
            height={48}
            alt="exam-logo"
            className="w-32 sm:w-40"
          />
        </Link>
        {questionMode !== "REVISION" && (
          <div className="hidden md:block text-teal-600 font-medium">
            ⏳ {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="block sm:hidden text-teal-600 font-medium">
        ⏳ {formatTime(timeLeft)}
      </div>

      {/* Question Card */}
      <div className="w-full max-w-5xl bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg mt-6 sm:mt-8">
        <div className="mb-4 sm:mb-6 text-base sm:text-lg text-gray-800 leading-relaxed">
          <strong>{currentQuestionIndex + 1}.</strong> {question.text}
        </div>

        {question.imageUrl && (
          <div className="mb-4">
            <Image
              src={question.imageUrl}
              alt={`Image for question ${currentQuestionIndex + 1}`}
              width={800}
              height={450}
              className="w-full h-auto max-h-[400px] object-contain rounded-md border"
            />
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          {shuffledOptions.map((option, idx) => {
            const isSelected = selectedOption?.id === option.id;
            const isCorrectAnswer = option.text === question.correctOption;
            const isDisabled = isAlreadyAnswered;

            let classes =
              "flex items-center justify-between border rounded-lg p-3 sm:p-4 " +
              (isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer");

            if ((showResult || isDisabled) && feedBackSlection !== "after") {
              if (isSelected && !isCorrectAnswer) {
                classes += " bg-red-50 border-red-400";
              } else if (isCorrectAnswer) {
                classes += " bg-green-50 border-green-400";
              } else {
                classes += " bg-white border-gray-200";
              }
            } else {
              classes += " hover:bg-gray-100 border-gray-200";
            }

            return (
              <div
                key={idx}
                onClick={() => !isDisabled && handleOptionClick(option)}
                className={classes}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      isSelected ? "bg-blue-500" : "bg-gray-400"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="text-sm sm:text-base">{option.text}</div>
                </div>
                {(showResult || isDisabled) &&
                  feedBackSlection !== "after" &&
                  (isSelected && !isCorrectAnswer ? (
                    <FaTimesCircle size={20} className="text-red-500" />
                  ) : isCorrectAnswer ? (
                    <FaCheckCircle size={20} className="text-green-500" />
                  ) : null)}
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {feedBackSlection !== "after" && showResult && (
          <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-bold text-[#002B5B] mb-2">
              Explanation {currentQuestionIndex + 1}
            </h3>
            <div
              style={{ overflow: "auto", maxHeight: 400 }}
              dangerouslySetInnerHTML={{ __html: question.explanation || "" }}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-1 sm:gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base disabled:opacity-50 cursor-pointer"
          >
            <FaArrowLeft className="text-xs sm:text-sm" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>

          {!answered ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null || isSubmitting}
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base disabled:opacity-50 min-w-[80px] cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          ) : currentQuestionIndex === questions?.questions.length - 1 ? (
            <button
              onClick={handleFinish}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base min-w-[80px] cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Finishing..." : "Finish"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded text-sm sm:text-base min-w-[80px] cursor-pointer"
            >
              <span>Next</span>
              <FaArrowRight className="text-sm" />
            </button>
          )}

          {answered &&
            currentQuestionIndex !== questions?.questions.length - 1 && (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded text-sm sm:text-base cursor-pointer"
              >
                <IoExitOutline className="text-sm sm:text-lg font-semibold" />
                <span className="hidden sm:inline">End Test</span>
                <span className="sm:hidden">End</span>
              </button>
            )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg mx-4 border border-red-500">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              End Test
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end the test immediately?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm sm:text-base cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFinish}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "End Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
