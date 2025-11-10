"use client";
import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-center p-6">
      <XCircle className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Cancelled</h1>
      <p className="text-lg text-gray-700 mb-6">
        It looks like your payment was cancelled. You can try again anytime.
      </p>
      <Link
        href="/"
        className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
      >
        Back to Home Page
      </Link>
    </div>
  );
}
