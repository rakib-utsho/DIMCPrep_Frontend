"use client";

import {
  useSignUpMutation,
  useSocialAuthMutation,
} from "@/redux/api/auth/authApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user/userSlice";
import Cookies from "js-cookie";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const { register, handleSubmit } = useForm();
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();
  const [signUp] = useSignUpMutation();
  const dispatch = useDispatch();
  const [socialAuth] = useSocialAuthMutation();

  const onSubmit = async (data: any) => {
    await signUp(data)
      .unwrap()
      .then((response) => {
        // console.log(response);
        localStorage.setItem("email", response?.data?.email);
        router.push(`/verification`);
      })
      .catch((error) => {
        toast.error(
          error?.data?.errorDetails?.message ||
            "Sign up failed. Please try again."
        );
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const idToken = await user.getIdToken();
      if (!user.emailVerified) {
        toast.error(
          "Please verify your Google account email before continuing."
        );
        return;
      }

      const playload = {
        name: user.displayName || "Google User",
        email: user.email,
        firebaseToken: idToken,
      };

      const response = await socialAuth(playload).unwrap();

      if (response?.success) {
        Cookies.set("token", response.data.accessToken);
        dispatch(
          setUser({
            user: {
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
              isVerified: response.data.isVerified,
              imageURL: response.data.imageURL,
              subscription: response.data.subcription,
            },
            token: response.data.accessToken,
          })
        );
        toast.success("Logged in with Google!");
        router.push("/");
      } else {
        toast.error("Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  };

  return (
    <div>
      <div
        className="flex min-h-screen items-center justify-center bg-[#F1FCFB] bg-center px-4 bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "url('/images/login.png'),url('/images/bg-login.png')",
          backgroundPosition: "center",
          backgroundSize: "100%",
          height: "100vh",
        }}
      >
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md z-10">
          <h1 className="text-2xl font-bold text-center mb-6">SignUp</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="mt-1 block w-full h-[51px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-teal-500 focus:outline-none"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 block w-full h-[51px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-teal-500 focus:outline-none"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="mt-1 block w-full h-[51px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-teal-500 focus:outline-none"
                placeholder="********"
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-4 w-4 cursor-pointer text-teal-500 border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium underline text-teal-500 cursor-pointer"
              >
                <Link href="/disclaimer" title="Disclaimer">
                  I agree with the terms and conditions
                </Link>
              </label>
            </div>
            <button
              disabled={!agreed}
              type="submit"
              className={`w-full py-2 px-4 rounded-md shadow-sm transition
    ${
      agreed
        ? "bg-teal-500 hover:bg-teal-600 text-white cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
            >
              Sign Up
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500 text-sm">
              Other log in options
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="text-start text-gray-600 text-sm mb-3">
            <p className="text-[14px]">Log In with Open Account</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-4 font-bold">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center border px-4 py-2 rounded-md w-full hover:bg-gray-50 text-[12px]"
            >
              <Image
                src="/images/features/google.png"
                alt="Google"
                title="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Log In with Google
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/signIn" className="text-teal-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
