"use client";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function SuccessPage() {
  const router = useRouter();

  const handleSignInClick = () => {
    Cookies.remove("token"); // 🔥 Clear the token
    localStorage.removeItem("email"); // Optional: also clean up signup email
    router.push("/signIn");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bgColor)] text-center p-6">
      <CheckCircle className="w-20 h-20 text-[var(--secondary)] mb-4" />
      <h1 className="text-3xl font-bold text-[var(--secondary)] mb-2">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your subscription has been activated. Please Login again...
      </p>
      <button
        onClick={handleSignInClick}
        className="bg-[var(--secondary)] text-white px-6 py-2 rounded-full hover:bg-green-700 transition cursor-pointer"
      >
        Sign In
      </button>
    </div>
  );
}
