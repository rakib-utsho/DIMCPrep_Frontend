import { useGetCategoriesQuery } from "@/redux/api/categories/CategoriesApi";
import { useGetQuestionsMutation } from "@/redux/api/exam/examApi";
import { setQuizzes } from "@/redux/features/quiz/quizSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiTime } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type Mode = "REVISION" | "TIMED";
type FeedbackType = "instant" | "after";
type DisplayOption = "ALL" | "UNSEEN" | "WRONG" | "WRONG_AND_UNSEEN";
interface GetQuestionsRequest {
  mode: Mode;
  selectedCategories: string[];
  filterOption: DisplayOption;
  allowedTime: number;
  questionLimit: number;
  randomize: boolean;
  feedback: FeedbackType;
}

const ResponsiveLoader = () => (
  <div className="flex items-center justify-center min-h-[200px] w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
  </div>
);

export default function TestModalOne() {
  // API & Router Setup
  const { data: topics, error, isLoading } = useGetCategoriesQuery();
  const [getQuestions, { isLoading: examLoading }] = useGetQuestionsMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  // State Management
  const [activeTab, setActiveTab] = useState<
    "test" | "question" | "additional"
  >("test");
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [isTestConfiguring, setIsTestConfiguring] = useState(false);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timePerTest, setTimePerTest] = useState<number>(60);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedFeedback, setSelectedFeedback] =
    useState<FeedbackType>("instant");
  const [selectedOption, setSelectedOption] = useState<DisplayOption>("ALL");
  const [additionalStep, setAdditionalStep] = useState<1 | 2>(1);
  const [noQuestion, setNoQuestions] = useState(false);

  // Helper Functions
  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const options: { id: DisplayOption; label: string }[] = [
    { id: "ALL", label: "Face all questions" },
    { id: "UNSEEN", label: "Face questions that I have not seen before" },
    { id: "WRONG", label: "Face questions that I got wrong last time" },
    {
      id: "WRONG_AND_UNSEEN",
      label:
        "Face questions that I got wrong last time or have not seen before",
    },
  ];

  // Event Handlers
  const handleNext = async () => {
    if (activeTab === "test") {
      if (!selectedMode) {
        toast.error("Please select a mode first.");
        return;
      }
      if (selectedMode === "REVISION") {
        setActiveTab("question");
        setIsTestConfiguring(false);
      } else {
        if (!isTestConfiguring) {
          setIsTestConfiguring(true);
        } else {
          setActiveTab("question");
          setIsTestConfiguring(false);
        }
      }
    } else if (activeTab === "question") {
      if (selectedTopics.length === 0) {
        toast.error("Please select at least one topic before proceeding.");
        return;
      }
      setAdditionalStep(1);
      setActiveTab("additional");
    } else if (activeTab === "additional") {
      if (additionalStep === 1) {
        setAdditionalStep(2);
      } else {
        const questionLimitForRevision =
          Math.floor(Math.random() * 11) + 10; // Random from 10 to 20

        const finalData: GetQuestionsRequest = {
          mode: selectedMode ? selectedMode : "REVISION",
          selectedCategories: selectedTopics,
          filterOption: selectedOption,
          questionLimit:
            selectedMode === "REVISION"
              ? questionLimitForRevision
              : questionCount,
          allowedTime:
            selectedMode === "REVISION" ? 0 : timePerTest * questionCount,
          feedback: selectedFeedback,
          randomize: true,
        };

        // Debug logs to verify values
        // console.log("Final data sent to getQuestions:", finalData);

        try {
          const result = await getQuestions(finalData).unwrap();
          if (result.success) {
            setNoQuestions(false);
            dispatch(setQuizzes(result));
            const queryString = new URLSearchParams({
              mode: finalData.mode,
              questionCount: finalData.questionLimit.toString(),
              feedback: finalData.feedback,
              timePerTest: timePerTest.toString(),
              topics: finalData.selectedCategories.join(","),
              displayOption: finalData.filterOption,
            }).toString();
            router.push(`/exam?${queryString}`);
          } else {
            setNoQuestions(true);
          }
        } catch (error) {
          setNoQuestions(true);
          console.error("Failed to get questions:", error);
          toast.error("Failed to load questions. Please try again.");
        }
      }
    }
  };

  const handlePrevious = () => {
    setNoQuestions(false);
    if (activeTab === "additional") {
      if (additionalStep === 2) {
        setAdditionalStep(1);
      } else {
        setActiveTab("question");
      }
    } else if (activeTab === "question") {
      setActiveTab("test");
      setIsTestConfiguring(false);
    } else if (activeTab === "test") {
      if (isTestConfiguring) {
        setIsTestConfiguring(false);
      } else if (selectedMode === "REVISION") {
        setSelectedMode(null);
      }
    }
  };

  // Render
  if (isLoading) return <ResponsiveLoader />;
  if (error)
    return <div className="text-red-500 p-4">Error loading categories</div>;

  return (
    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full min-h-[calc(100vh-2rem)] sm:min-h-[500px] md:min-h-[600px] px-4 sm:px-6 md:px-8 py-4 overflow-y-auto">
      <div className="w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-4 flex flex-col items-center">
        {/* Static Navigation Tabs */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 md:mb-12 w-full">
          {[
            {
              tab: "test",
              title: "Test Mode",
              icon: <BiTime size={18} className="sm:w-5 sm:h-5" />,
            },
            {
              tab: "question",
              title: "Question Mode",
              icon: <BsQuestionCircle size={18} className="sm:w-5 sm:h-5" />,
            },
            {
              tab: "additional",
              title: "Additional Options",
              icon: (
                <IoDocumentTextOutline size={18} className="sm:w-5 sm:h-5" />
              ),
            },
          ].map(({ tab, icon, title }) => (
            <div
              key={tab}
              className={`flex items-center justify-center gap-1 sm:gap-2 py-2 px-1 sm:px-2 rounded-md text-xs sm:text-sm ${
                activeTab === tab
                  ? "bg-teal-500 text-white"
                  : "text-teal-500 border border-teal-500"
              }`}
            >
              {icon} <span className="hidden sm:inline">{title}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="w-full sm:w-[370px] md:w-full lg:w-full px-2 sm:px-4 md:px-6 space-y-4 mb-8 sm:mb-12 md:mb-16">
          {/* Test Mode Selection */}
          {activeTab === "test" && !isTestConfiguring && (
            <div className="space-y-3 sm:space-y-4 flex flex-col items-center justify-center">
              <button
                onClick={() => setSelectedMode("TIMED")}
                className={`w-full max-w-[280px] sm:max-w-[300px] py-2 sm:py-3 px-3 sm:px-4 rounded-md text-center transition-colors text-sm sm:text-base cursor-pointer ${
                  selectedMode === "TIMED"
                    ? "border-2 border-teal-500 text-teal-700 bg-white shadow-md"
                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Full Exam Mode (Timed)
              </button>
              <button
                onClick={() => setSelectedMode("REVISION")}
                className={`w-full max-w-[280px] sm:max-w-[300px] py-2 sm:py-3 px-3 sm:px-4 rounded-md text-center transition-colors text-sm sm:text-base cursor-pointer ${
                  selectedMode === "REVISION"
                    ? "border-2 border-teal-500 text-teal-700 bg-white shadow-md"
                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Practice Mode (Un-timed)
              </button>
            </div>
          )}

          {/* Test Configuration */}
          {activeTab === "test" &&
            isTestConfiguring &&
            selectedMode === "TIMED" && (
              <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center w-full">
                <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 max-w-[600px]">
                  <div className="w-full sm:w-1/2">
                    <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                      How many Questions?
                    </label>
                    {/* How many Questions? */}
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      value={isNaN(questionCount) ? "" : questionCount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setQuestionCount(NaN); // Allow clearing
                        } else {
                          setQuestionCount(Number(value));
                        }
                      }}
                      onBlur={(e) => {
                        const value = Number(e.target.value);
                        if (isNaN(value) || value < 1) {
                          setQuestionCount(1); // Enforce minimum
                        }
                      }}
                      className="w-full border-2 border-gray-200 rounded-md py-1 sm:py-2 px-2 sm:px-3 hover:border-teal-500 focus:outline-none focus:border-teal-500 transition duration-200 text-sm sm:text-base"
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <label className="block text-gray-700 mb-1 sm:mb-2 font-medium text-sm sm:text-base">
                      Time Per Question (seconds)
                    </label>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={10}
                      value={isNaN(timePerTest) ? "" : timePerTest}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          setTimePerTest(NaN); // Allow clearing
                        } else {
                          setTimePerTest(Number(value));
                        }
                      }}
                      onBlur={(e) => {
                        const value = Number(e.target.value);
                        if (isNaN(value) || value < 10) {
                          setTimePerTest(10); // Enforce minimum
                        }
                      }}
                      className="w-full border-2 border-gray-200 rounded-md py-1 sm:py-2 px-2 sm:px-3 hover:border-teal-500 focus:outline-none focus:border-teal-500 transition duration-200 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            )}

          {/* Question Mode */}
          {activeTab === "question" && (
            <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-2 bg-white rounded-md shadow">
              <h1 className="text-md sm:text-lg md:text-xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
                Select Topics to Practice
              </h1>
              <div className="flex justify-end mb-3 sm:mb-4">
                <button
                  onClick={() => {
                    if (selectedTopics.length === topics?.categories.length) {
                      setSelectedTopics([]);
                    } else {
                      setSelectedTopics(
                        topics?.categories.map((topic) => topic.id) || []
                      );
                    }
                  }}
                  className={`py-1 sm:py-2 px-2 sm:px-4 rounded-md text-xs sm:text-xs md:text-sm transition-colors cursor-pointer ${
                    selectedTopics.length === topics?.categories.length
                      ? "bg-teal-500 text-white hover:bg-teal-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedTopics.length === topics?.categories?.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>
              <div className="max-h-[40vh] sm:max-h-[250px] overflow-y-auto pr-2 custom-scroll">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 min-w-[260px]">
                  {topics?.categories.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-md text-left transition-colors text-sm sm:text-base cursor-pointer ${
                        selectedTopics.includes(topic.id)
                          ? "border-2 border-teal-500 text-teal-600 bg-teal-50"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {topic.name}
                      <span className="text-xs ml-2 text-teal-500">
                        {" "}
                        ({topic._count.questions as any} Questions)
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Additional Options Step 1 */}
          {activeTab === "additional" && additionalStep === 1 && (
            <div className="w-full max-w-md mx-auto p-4 sm:p-5 md:p-6 bg-white rounded-md shadow">
              <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
                Feedback Choice
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={() => setSelectedFeedback("instant")}
                  className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-md text-center transition-colors text-sm sm:text-base cursor-pointer ${
                    selectedFeedback === "instant"
                      ? "border-2 border-teal-500 text-teal-700 bg-teal-50"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Feedback After Each Question
                </button>
                <button
                  onClick={() => setSelectedFeedback("after")}
                  className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-md text-center transition-colors text-sm sm:text-base cursor-pointer ${
                    selectedFeedback === "after"
                      ? "border-2 border-teal-500 text-teal-700 bg-teal-50"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Feedback After Quiz Submission
                </button>
              </div>
            </div>
          )}

          {/* Additional Options Step 2 */}
          {activeTab === "additional" && additionalStep === 2 && (
            <div className="w-full max-w-md mx-auto p-4 sm:p-5 md:p-6 bg-white rounded-md shadow">
              <h2 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-4 sm:mb-5 md:mb-6">
                Question Display Options
              </h2>
              <div className="space-y-3 sm:space-y-2">
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() =>
                      setSelectedOption(option.id as DisplayOption)
                    }
                    className={`w-full py-1 sm:py-2 px-3 sm:px-4 rounded-md text-center transition-colors text-sm sm:text-base cursor-pointer ${
                      selectedOption === option.id
                        ? "border-2 border-teal-500 text-teal-700 bg-teal-50"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {noQuestion && (
          <div className="mb-2 sm:mb-3 p-2 text-sm sm:text-base bg-red-100 text-red-700 rounded-md text-center">
            No questions available. Please try different options.
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-md mx-auto mb-8">
          {(activeTab === "question" ||
            activeTab === "additional" ||
            isTestConfiguring) && (
            <button
              onClick={handlePrevious}
              className="cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-md bg-teal-500 text-white flex items-center gap-1 sm:gap-2 hover:bg-teal-600 transition-colors text-sm sm:text-base cursor-pointer"
            >
              <FaArrowLeft size={14} className="sm:w-4 sm:h-4" /> Previous
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={
              (activeTab === "test" && !isTestConfiguring && !selectedMode) ||
              (activeTab === "question" && selectedTopics.length === 0) ||
              (activeTab === "additional" &&
                additionalStep === 1 &&
                !selectedFeedback &&
                selectedMode !== "REVISION") ||
              isLoading ||
              examLoading
            }
            className={`cursor-pointer px-6 sm:px-8 md:px-10 py-2 sm:py-3 rounded-md text-white flex items-center justify-center gap-1 sm:gap-2 min-w-[100px] sm:min-w-[120px] transition-colors text-sm sm:text-base ${
              (activeTab === "test" && !isTestConfiguring && !selectedMode) ||
              (activeTab === "question" && selectedTopics.length === 0) ||
              (activeTab === "additional" &&
                additionalStep === 1 &&
                !selectedFeedback &&
                selectedMode !== "REVISION") ||
              isLoading ||
              examLoading
                ? "bg-teal-300 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isLoading || examLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              <span className="flex gap-1 sm:gap-2 items-center">
                Next <FaArrowRight size={14} className="sm:w-4 sm:h-4" />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
