"use client";

import Image from "next/image";
import { useState } from "react";
import { FaCheck, FaChevronRight, FaCommentDots } from "react-icons/fa";
import {
  useGetExamDetailsQuery,
  useSubmitFeedbackMutation,
} from "@/redux/api/exam/examApi";
import { Modal } from "../modal/Modal";
import ModalThemeWrapper from "../modal/ModalThemeWrapper";
import Explanation from "../Explanation/Explanation";
import { toast } from "sonner";

interface ProfileStat {
  id: number;
  image: string;
  value: string;
  label: string;
}

interface QuestionOption {
  optionText: string;
  isCorrectOption: boolean;
}

interface LocalQuestionBreakdown {
  questionId: string;
  questionText: string;
  category: string;
  options: QuestionOption[];
  selectedOption: { text: string };
  correctOption: string;
  explanation: string | null;
  submittedAnswer: string; // New field to store the user's submitted answer
  timeTakenInSeconds: number;
  imageUrl: string;
}

interface ExamDetails {
  score: number;
  numQuestions: number;
  percentage: number;
  totalTimeTaken: number;
  allowedTime?: number;
  questionBreakdown: LocalQuestionBreakdown[];
}

const ResultWithReview = ({ examId }: { examId: string }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [activeFeedbackBox, setActiveFeedbackBox] = useState<string | null>(
    null
  );
  const [feedbacks, setFeedbacks] = useState<{ [id: string]: string }>({});

  const { data, isLoading, error } = useGetExamDetailsQuery(examId, {
    refetchOnMountOrArgChange: true,
  });
  const [submitFeedback] = useSubmitFeedbackMutation();

  const handleModalClose = () => setModalOpen(false);
  const handleOpenModal = (index: number) => {
    setCurrentQuestionIndex(index);
    setModalOpen(true);
  };

  const toggleFeedbackBox = (questionId: string) => {
    setActiveFeedbackBox((prev) => (prev === questionId ? null : questionId));
  };

  const handleFeedbackChange = (questionId: string, message: string) => {
    setFeedbacks((prev) => ({ ...prev, [questionId]: message }));
  };

  const handleFeedbackSubmit = async (questionId: string) => {
    const message = feedbacks[questionId]?.trim();
    if (!message)
      return toast.error("Please write feedback before submitting.");

    try {
      const res = await submitFeedback({
        id: questionId,
        text: message,
      }).unwrap();
      if (res?.success) {
        toast.success("Feedback submitted!");
        setFeedbacks((prev) => ({ ...prev, [questionId]: "" }));
        setActiveFeedbackBox(null);
      } else {
        toast.error("Submission failed. Try again.");
      }
    } catch (error) {
      toast.error("Network error. Try later.");
      console.error("Feedback submission error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 min-h-screen">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-8 h-8 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-teal-500 mx-auto"></div>
          {/* <span className="text-teal-500">Fetching your exam results...</span> */}
        </div>
        {/* You can customize the text or add more animation effects */}
      </div>
    );
  }

  if (error)
    return (
      <div className="text-center py-8 text-red-500">Error loading results</div>
    );
  if (!data?.exam)
    return <div className="text-center py-8">No exam data found</div>;

  const exam: ExamDetails = {
    ...data.exam,
    questionBreakdown: data.exam.questionBreakdown.map((q: any) => ({
      ...q,
      imageUrl: q.imageUrl ?? "", // ensure imageUrl exists
      submittedAnswer: q.selectedOption.text, // Add the submitted answer to the breakdown
    })),
  };

  const profileStats: ProfileStat[] = [
    {
      id: 1,
      image: "/images/text.png",
      value: `${exam.score}/${exam.numQuestions}`,
      label: "Correct Answers",
    },
    {
      id: 2,
      image: "/images/speed.png",
      value: `${exam.percentage}%`,
      label: "Score Percentage",
    },
    {
      id: 3,
      image: "/images/time.png",
      value: `${exam.totalTimeTaken}s/${exam.allowedTime ?? "Unlimited"}`,
      label: "Time Taken",
    },
  ];

  const currentExplanations = exam.questionBreakdown.map((q, index) => ({
    title: `Question ${index + 1}`,
    question: q.questionText,
    answer: `Correct answer: ${q.correctOption}`,
    submittedAnswer: `Your submitted answer: ${q.submittedAnswer}`,
    explanation: q.explanation || "No explanation available for this question",
  }));

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <h1 className="text-2xl font-bold text-center mb-6 sm:mb-8 mt-3 sm:mt-5">
          Test Result
        </h1>

        <div className="flex flex-wrap justify-center gap-4 sm:grid sm:grid-cols-3 mb-12 sm:mb-14">
          {profileStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white w-[110px] sm:w-auto p-3 sm:p-6 rounded-lg shadow-sm flex flex-col items-center"
            >
              <Image
                src={stat.image || "/placeholder.svg"}
                alt={stat.label}
                width={40}
                height={40}
                className="object-contain w-10 h-10 sm:w-16 sm:h-16"
              />
              <div className="text-blue-500 font-bold text-base sm:text-2xl mt-1 sm:mt-2">
                {stat.value}
              </div>
              <div className="text-[#000000] text-xs sm:text-md mt-0.5 sm:mt-1 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {exam.questionBreakdown.map((question, questionIndex) => (
            <div key={question.questionId} className="mb-8 sm:mb-10 md:mb-12">
              <p className="font-medium mb-2 text-sm sm:text-base text-justify">
                {questionIndex + 1}. {question.questionText}
                <span className="ml-2 text-xs sm:text-sm text-gray-500">
                  ({question.category})
                </span>
              </p>

              {/* Display the question image if available */}
              {question.imageUrl && (
                <div className="mb-4">
                  <Image
                    src={question.imageUrl}
                    alt={`Question ${questionIndex + 1} image`}
                    width={600}
                    height={400}
                    className="rounded-lg object-contain max-h-60 w-auto"
                  />
                </div>
              )}

              <div className="space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected =
                    question.selectedOption.text === option.optionText;
                  const isCorrect = option.isCorrectOption;
                  return (
                    <div
                      key={`${question.questionId}-${optionIndex}`}
                      className={`border border-gray-200 rounded-md p-2 sm:p-3  ${
                        isCorrect
                          ? "bg-green-50"
                          : isSelected
                          ? "bg-red-50"
                          : ""
                      } flex items-center`}
                    >
                      <div
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${
                          isSelected
                            ? isCorrect
                              ? "bg-green-500"
                              : "bg-red-500"
                            : isCorrect
                            ? "bg-green-500"
                            : "bg-gray-200"
                        } text-white font-medium flex items-center justify-center mr-2 sm:mr-3 text-xs sm:text-sm text-justify`}
                      >
                        {String.fromCharCode(97 + optionIndex)}
                      </div>
                      <span className="flex-grow text-sm sm:text-base">
                        {option.optionText}
                      </span>
                      {isCorrect && (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-200 flex items-center justify-center">
                          <FaCheck className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-3 gap-2">
                <div className="text-xs sm:text-sm text-gray-500">
                  Time taken: {question.timeTakenInSeconds} seconds
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleFeedbackBox(question.questionId)}
                    className="bg-teal-500 cursor-pointer text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center text-sm sm:text-base"
                    title="Leave Feedback"
                  >
                    Feedback
                    <FaCommentDots className="ml-1 w-2 h-2 sm:w-3 sm:h-3" />
                  </button>
                  <button
                    onClick={() => handleOpenModal(questionIndex)}
                    className="bg-teal-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md flex items-center cursor-pointer text-sm sm:text-base"
                  >
                    Explanation
                    <FaChevronRight className="ml-1 w-2 h-2 sm:w-3 sm:h-3" />
                  </button>
                </div>
              </div>

              {activeFeedbackBox === question.questionId && (
                <div className="mt-3">
                  <textarea
                    rows={3}
                    placeholder="Write your feedback here, e.g., if you have any concerns about this question or its explanation."
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    value={feedbacks[question.questionId] || ""}
                    onChange={(e) =>
                      handleFeedbackChange(question.questionId, e.target.value)
                    }
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleFeedbackSubmit(question.questionId)}
                      className="bg-teal-500 cursor-pointer text-white px-4 py-2 rounded text-sm"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <ModalThemeWrapper>
          <Explanation
            initialIndex={currentQuestionIndex}
            customExplanations={currentExplanations}
          />
        </ModalThemeWrapper>
      </Modal>
    </div>
  );
};

export default ResultWithReview;
