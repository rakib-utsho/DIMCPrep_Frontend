"use client";
import React, { useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { useCreateReviewMutation } from "@/redux/api/review/reviewApi";
import { toast } from "sonner";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createReview({rating, review: message }).unwrap();
      toast.success(res.message, {});
      setMessage("");
      setRating(0);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit review", {});
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 mb-10">
        <div className="rounded-lg mt-20 p-6">
          <h1 className="text-3xl font-bold text-center mb-2">Add a Review</h1>
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

          <p className="text-center mb-10 max-w-2xl mx-auto">
          Please provide us with your review. We welcome all feedback as we continue to improve this question bank
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">
                Your rating <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    <FaStar
                      className={`${star <= rating ? "text-yellow-400" : "text-gray-300"
                        } hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-2">
                Message<span className="text-red-500">*</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your review here...."
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              ></textarea>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-secondary/90 cursor-pointer text-white px-8 py-3 rounded-md flex items-center justify-center hover:bg-secondary transition-colors"
              >
                {isLoading ? "Submitting..." : "Submit"}
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
