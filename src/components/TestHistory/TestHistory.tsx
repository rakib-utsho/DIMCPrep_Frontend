"use client";

import { useState } from "react";
import {
  useGetTestHistoryQuery,
  UserTestHistory,
} from "@/redux/api/MyTestPerformance/MyTestPerformance";
import { LuFileText } from "react-icons/lu";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { TbListDetails } from "react-icons/tb";

// Convert UTC datetime string to local 12-hour time string
function formatTo12HourUTC(utcDateString: string) {
  const date = new Date(utcDateString);
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Convert UTC datetime string to local date
function formatToLocalDate(utcDateString: string) {
  const date = new Date(utcDateString);
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function TestHistory() {
  const { data, isLoading } = useGetTestHistoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  if (isLoading) {
    return (
      <p className="text-center min-h-screen flex justify-center items-center">
        <Loader />
      </p>
    );
  }

  if (!data?.exams?.length) {
    return <p className="text-center min-h-screen">No test history found.</p>;
  }

  const testHistoryData = data.exams
    .slice()
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    )
    .map((test: UserTestHistory) => {
      return {
        id: test.id,
        date: formatToLocalDate(test.startedAt),
        time12hr: formatTo12HourUTC(test.startedAt),
        category: test.categories.map((cat) =>
          cat.length > 20 ? cat.slice(0, 20) + "..." : cat
        ),
        fullCategory: test.categories.join(", "),
        totalQuestions: test.numOFQuestions,
        score: test.score,
        progress: Math.round((test.score / test.numOFQuestions) * 100),
      };
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = testHistoryData.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(testHistoryData.length / itemsPerPage);

  const handleReview = () => {
    router.push("/review");
  };

  const handleViewDetails = (examId: string) => {
    router.push(`/result/${examId}`);
  };

  const renderPageNumbers = () => {
    const pageButtons = [];
    const delta = 2;

    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    for (const i of range) {
      if (i === "...") {
        pageButtons.push(
          <span key={`ellipsis-${Math.random()}`} className="px-2 text-gray-400">
            ...
          </span>
        );
      } else {
        pageButtons.push(
          <button
            key={i}
            onClick={() => setCurrentPage(Number(i))}
            className={`px-3 py-1 rounded border text-sm transition ${
              currentPage === i
                ? "bg-[#002B5B] text-white"
                : "bg-gray-100 hover:bg-[#002B5B] hover:text-white"
            }`}
          >
            {i}
          </button>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className="min-h-screen bg-[#F1FCFB] flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[1100px] bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-xl font-medium text-center mb-6">Test History</h2>

        {/* Desktop Table Header */}
        <div className="hidden sm:block w-full overflow-x-auto">
          <div className="min-w-[800px] w-full">
            <div className="grid grid-cols-5 gap-4 mb-4 text-sm font-medium">
              <div className="flex items-center">
                Date <span className="ml-1 text-gray-400">↓</span>
              </div>
              <div className="flex items-center">
                Category <span className="ml-1 text-gray-400">↓</span>
              </div>
              <div className="flex items-center">
                Total Question <span className="ml-1 text-gray-400">↓</span>
              </div>
              <div className="flex items-center">
                Score <span className="ml-1 text-gray-400">↓</span>
              </div>
              <div className="flex items-center">Review</div>
            </div>
          </div>
        </div>

        {currentItems.map((item, index) => (
          <div
            key={index}
            className="border-t border-gray-100 py-6 sm:py-10 w-full"
          >
            {/* Desktop Row */}
            <div className="hidden sm:grid grid-cols-5 gap-4 mb-2">
              <div className="text-sm">
                {item.date}
                <br />
                {item.time12hr} <br />
                <span className="text-xs text-gray-500">Local Time</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-1">
                  {item.category.map((cat, catIndex) => (
                    <span
                      key={catIndex}
                      className="px-2 py-1 bg-red-50 text-red-700 rounded-md text-xs"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center text-sm border border-[#002B5B]">
                  {item.totalQuestions}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-8 bg-blue-50 rounded flex items-center justify-center text-sm border border-[#3F42FF]">
                  {item.score ?? 0}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleViewDetails(item.id)}
                  className="h-8 px-4 rounded border border-gray-200 bg-white hover:bg-gray-100 text-sm text-gray-700 flex items-center cursor-pointer"
                >
                  <TbListDetails className="w-4 h-4 mr-2" />
                  Exam Details
                </button>

                <button
                  onClick={handleReview}
                  className="h-8 px-4 rounded flex items-center justify-center text-sm border border-gray-200 bg-[#002B5B] hover:bg-[#002B5B] text-white cursor-pointer"
                >
                  <LuFileText className="w-4 h-4 mr-2" />
                  Review
                </button>
              </div>
            </div>

            {/* Mobile Card */}
            <div className="sm:hidden flex flex-col gap-3 bg-gray-50 p-4 rounded-md text-sm">
              <div>
                <span className="font-medium">Date:</span> {item.date}
              </div>
              <div>
                <span className="font-medium">Time:</span> {item.time12hr}{" "}
                <span className="text-xs text-gray-500 ml-1">(Local Time)</span>
              </div>
              <div>
                <span className="font-medium">Category:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.category.map((cat, catIndex) => (
                    <span
                      key={catIndex}
                      className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Total Questions:</span>{" "}
                {item.totalQuestions}
              </div>
              <div>
                <span className="font-medium">Score:</span> {item.score}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleViewDetails(item.id)}
                  className="w-full py-1 rounded border border-gray-300 text-gray-700 text-sm bg-white"
                >
                  <TbListDetails className="inline w-4 h-4 mr-1" />
                  Exam Details
                </button>
                <button
                  onClick={handleReview}
                  className="w-full py-1 rounded bg-[#002B5B] text-white text-sm"
                >
                  <LuFileText className="inline w-4 h-4 mr-1" />
                  Review
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-1000 ease-in-out"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">
              {item.progress}%
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border bg-gray-100 disabled:opacity-50 hover:bg-[#002B5B] cursor-pointer hover:text-white"
          >
            Prev
          </button>
          {renderPageNumbers()}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border bg-gray-100 disabled:opacity-50 hover:bg-[#002B5B] cursor-pointer hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
