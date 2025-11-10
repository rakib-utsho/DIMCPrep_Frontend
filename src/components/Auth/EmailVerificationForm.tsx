"use client";

import { useResendCodeMutation, useVerifyEmailMutation } from "@/redux/api/auth/authApi";
import { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaEnvelope } from "react-icons/fa";
import { toast } from "sonner";



export default function EmailVerificationForm() {

  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyEmail] = useVerifyEmailMutation();
  const [resendCode] = useResendCodeMutation();

  const email = localStorage.getItem("email")



  // Handle input change
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.split("").slice(0, verificationCode.length - index);
      const newCode = [...verificationCode];

      digits.forEach((digit, i) => {
        if (index + i < verificationCode.length) {
          newCode[index + i] = digit;
        }
      });

      setVerificationCode(newCode);
      const nextIndex = Math.min(index + digits.length, verificationCode.length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < verificationCode.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    setError("");
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < verificationCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsVerifying(true);
    setError(""); // Clear any previous error

    try {
      // Call the verifyEmail API
      const response = await verifyEmail({ email: email, token: code }).unwrap();

      // Check if the response indicates a successful verification
      if (response.success) {
        toast.success("Email verified successfully!");
        setIsVerified(true); // Show success page
      } else {
        toast.error(`${response.data.message}`);
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err); // For debugging purposes
    } finally {
      setIsVerifying(false); // Stop the loading spinner
    }
  };


  const handleResendCode = async () => {
    setResendDisabled(true);
    setCountdown(60);

    try {
      await resendCode({ email: email }).unwrap();
      toast.success("Verification code resent successfully!");
      setError("");  // Reset error if resend is successful
    } catch (err) {
      setError("Failed to resend code. Please try again.");
      console.error(err); // For debugging purposes, log the actual error
    } finally {
      // Ensure button is re-enabled after the request
      setResendDisabled(false);
    }
  };


  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {isVerified ? (
          <div className="flex flex-col items-center justify-center py-8">
            <FaCheckCircle className="text-teal-500 text-6xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Your email has been successfully verified. You can now continue
              using our platform.
            </p>
            <button
              className="w-full py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors cursor-pointer"
              onClick={() => (window.location.href = "/signIn")}
            >
              Continue to Login
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-teal-500 text-2xl" />
              </div>
              <p className="text-red-400">
                Please wait up to 15 minutes for a verification code, and avoid
                using @NHS email accounts for sign up.
              </p>
              <p className="text-gray-600">
                We've sent a verification code to{" "}
                <span className="font-medium text-[var(--primary)]">
                  {email}
                </span>
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter verification code
              </label>
              <div className="flex gap-2 justify-between mb-2">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className=" w-full h-12 text-center text-lg font-bold border border-teal-500 rounded-md focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                  />
                ))}
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full cursor-pointer py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors disabled:bg-teal-300 mb-4 flex items-center justify-center"
            >
              {isVerifying ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendCode}
                disabled={resendDisabled}
                className="text-teal-500 hover:text-teal-700 text-sm font-medium disabled:text-gray-400 cursor-pointer"
              >
                {resendDisabled
                  ? `Resend code in ${countdown}s`
                  : "Resend code"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
