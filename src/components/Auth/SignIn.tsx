'use client';
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import {
  useSignInMutation,
  useSocialAuthMutation,
} from "@/redux/api/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/user/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { title } from "process";

export default function SignInPage() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const [signIn, { isLoading }] = useSignInMutation();
  const [socialAuth] = useSocialAuthMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    try {
      const response = await signIn(data).unwrap();
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
              subscriptions: response.data.subscriptions,
            },

            token: response.data.accessToken,
          })
        );
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
    }
  };

const handleGoogleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const payload = {
      name: user.displayName || "Google User",
      email: user.email,
      imageURL: user.photoURL || null,
    };

    const response = await socialAuth(payload).unwrap();

    // console.log("API Response:", {
    //   success: response?.success,
    //   hasSubscriptions: !!response.data?.user?.subscriptions,
    // });

    if (response?.success) {
      Cookies.set("token", response.data.accessToken);

      // Handle both response structures (user might be at different levels)
      const userData = response.data.user || response.data;

      if (!userData) {
        throw new Error("No user data in response");
      }

      dispatch(
        setUser({
          user: {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            isVerified: userData.isVerified,
            imageURL: userData.imageURL,
            subscriptions: userData.subscriptions || [], // Fallback to empty array
            provider: "google",
          },
          token: response.data.accessToken,
        })
      );

      // Small delay to ensure Redux state updates
      setTimeout(() => {
        toast.success("Logged in with Google!");
        router.push("/");
      }, 50);
    }
  } catch (error) {
    console.error("Google login error:", error);
    toast.error("Google login failed");
  }
};

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#F1FCFB] bg-center px-4 bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/images/login.png'),url('/images/bg-login.png')",
        backgroundPosition: "center",
        backgroundSize: "100%",
        height: "100vh",
      }}
    >
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md z-10">
        <h1 className="text-2xl font-bold text-center mb-6">SignIn</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 block w-full h-[51px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-300"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <div className="flex justify-between mt-5">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <label className="block text-sm font-medium text-[#20B2AA]">
                <Link href="/forgetPassword" title="Forget Password">Forgot your password?</Link>
              </label>
            </div>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full h-[51px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-300"
                placeholder="********"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full py-2 px-4 bg-secondary/90 hover:bg-secondary cursor-pointer text-white rounded-md shadow-sm transition"
          >
            {isLoading ? "Signing...." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-4 text-gray-500 text-sm">
            Other login options
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="text-start text-gray-600 text-sm mb-3">
          <p className="text-[14px]">Log In with Open Account</p>
        </div>

        {/* Google Login Button */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-4 font-bold">
          <button
            className="flex items-center justify-center border px-4 py-2 rounded-md w-full hover:bg-gray-50 text-[12px]"
            onClick={handleGoogleLogin}
          >
            <Image
              src="/images/features/google.png"
              alt="Google"
              title="Google Image"
              width={20}
              height={20}
              className="mr-2"
            />
            Log In with Google
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a href="/signUp" title="SignUp Page" className="text-teal-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
