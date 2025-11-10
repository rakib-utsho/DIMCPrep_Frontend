"use client"

import { useState } from "react"
import { EyeIcon, EyeOffIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"
import Link from "next/link"
import { useResetPasswordMutation } from "@/redux/api/auth/authApi"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"


export default function ResetPassword() {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [resetSuccess, setResetSuccess] = useState(false)
    const [error, setError] = useState("")
    const [resetPassword] = useResetPasswordMutation()

    const requirements = [
        { text: "At least 6 characters", met: formData.password.length >= 8 },
        { text: "At least one uppercase letter", met: /[A-Z]/.test(formData.password) },
        { text: "At least one lowercase letter", met: /[a-z]/.test(formData.password) },
        { text: "At least one number", met: /[0-9]/.test(formData.password) },
        { text: "At least one special character", met: /[^A-Za-z0-9]/.test(formData.password) },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (!requirements.every((req) => req.met)) {
            setError("Please meet all password requirements")
            return
        }

        setIsSubmitting(true)

        try {
            await resetPassword({ newPassword: formData.password, token }).unwrap();
            setResetSuccess(true);
        } catch (err: any) {
            const errorMessage = err?.data?.message || err?.error || "An error occurred. Please try again.";
            toast.error(errorMessage);
        }
        finally {
            setIsSubmitting(false)
        }
    }

    const getPasswordStrength = () => {
        const metRequirements = requirements.filter((req) => req.met).length
        if (metRequirements === 0) return { text: "Very Weak", color: "bg-red-500", width: "w-1/5" }
        if (metRequirements === 1) return { text: "Weak", color: "bg-red-400", width: "w-2/5" }
        if (metRequirements === 2) return { text: "Fair", color: "bg-yellow-400", width: "w-3/5" }
        if (metRequirements === 3) return { text: "Good", color: "bg-yellow-300", width: "w-4/5" }
        if (metRequirements === 4) return { text: "Strong", color: "bg-green-400", width: "w-4/5" }
        return { text: "Very Strong", color: "bg-green-500", width: "w-full" }
    }

    const strength = getPasswordStrength()

    if (resetSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Password Reset Successful</h2>
                        <p className="mt-2 text-sm text-gray-600">Your password has been successfully reset.</p>
                        <div className="mt-6">
                            <Link
                                href="/signIn"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                Return to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md lg:w-fill md:w-full">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Please create a new secure password for your account</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                            <div className="flex">
                                <XCircleIcon className="h-5 w-5 text-red-400" />
                                <p className="ml-3 text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {formData.password && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500">Password Strength:</span>
                                    <span className={`text-xs font-medium ${strength.color.replace("bg-", "text-")}`}>
                                        {strength.text}
                                    </span>
                                </div>
                                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${strength.color} ${strength.width}`} />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">Password must contain:</p>
                            <ul className="space-y-1">
                                {requirements.map((req, index) => (
                                    <li key={index} className="flex items-center text-xs">
                                        {req.met ? (
                                            <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                                        ) : (
                                            <XCircleIcon className="h-4 w-4 text-gray-300 mr-2" />
                                        )}
                                        <span className={req.met ? "text-green-700" : "text-gray-500"}>{req.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600">Passwords do not match</p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                    }`}
                            >
                                {isSubmitting ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
