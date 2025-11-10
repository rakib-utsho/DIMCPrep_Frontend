"use client"

import { useForgetPasswordMutation } from "@/redux/api/auth/authApi"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"

import { useState } from "react"
import { FaEnvelope, FaArrowRight } from "react-icons/fa"
import { toast } from "sonner"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [forgetPassword] = useForgetPasswordMutation() 
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!email) {
      const msg = "Please enter your email address"
      setMessage({ type: "error", text: msg })
      toast.error(msg)
      return
    }
  
    setIsSubmitting(true)
    setMessage(null)
  
    try {
      const res = await forgetPassword({ email }).unwrap()
      toast.success("Password reset instructions have been sent to your email")
      setMessage({
        type: "success",
        text: "Password reset instructions have been sent to your email",
      })
     
    } catch (error: any) {
      const errorMsg = error?.data?.message || "Something went wrong. Please try again."
      setMessage({ type: "error", text: errorMsg })
      toast.error(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }
  

  return (
    <div className="min-h-screen bg-[#f0f7f7] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Forgot Password</h1>

        {/* Heartbeat line */}
        <div className="flex justify-center mb-6">
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 10H10L13 3L18 17L23 7L26 10H40" stroke="#20B2AA" strokeWidth="2" />
          </svg>
        </div>

        <p className="text-center text-gray-600 mb-8">
          Enter your email address below and we'll send you instructions to reset your password.
        </p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-md flex items-center justify-center cursor-pointer transition-colors disabled:opacity-70"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Reset Password
                  <FaArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link href="signIn" className="text-teal-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
