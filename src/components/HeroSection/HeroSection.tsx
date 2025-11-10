"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Banner from "@/assets/banner/banner.png";
import SquareBoxImg from "@/assets/extra/squreBox.png";
import StarsRating from "./StarsRating";
import VerifyBadge from "@/assets/extra/verified.png";
import { motion } from "framer-motion";
import { Modal } from "../modal/Modal";
import ModalThemeWrapper from "../modal/ModalThemeWrapper";
import TestModalOne from "../modal/TestModalOne";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { logout } from "@/redux/features/user/userSlice";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const springPop = {
  hidden: { scale: 0.8, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

const HeroSection = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const router = useRouter();
  const user = useSelector((state: any) => state.user?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsCheckingUser(false), 100);
    return () => {
      clearTimeout(timer);
      setMounted(false);
    };
  }, []);

  const handleModalClose = () => setModalOpen(false);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing-section");
    if (pricingSection) {
      pricingSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      pricingSection.classList.add("animate-pulse");
      setTimeout(() => {
        pricingSection.classList.remove("animate-pulse");
      }, 2000);
    }
  };

  const handleStartTest = () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Session expired. Please log in again.");
      Cookies.remove("token");
      dispatch(logout());
      router.push("/signin")
    }

    if (!mounted || isCheckingUser) return;

    try {
      if (!user) {
        router.push("/signIn");
        return;
      }

      const subscriptions = user.subscriptions || [];

      if (subscriptions.length === 0) {
        toast.error("Please subscribe first to start a test.");
        scrollToPricing();
        return;
      }

      const activeSubscription = subscriptions.find(
        (sub: any) => sub?.isActive === true
      );

      if (!activeSubscription) {
        toast.error(
          "You have no active subscription. Please renew or subscribe."
        );
        scrollToPricing();
        return;
      }

      setModalOpen(true);
    } catch (error) {
      console.error("Subscription check error:", error);
      toast.error("Failed to check subscription status");
    }
  };

  return (
    <section className="w-full flex flex-col sm:flex-row items-center justify-between gap-10 sm:gap-20 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[100px] 2xl:px-[100px] pt-10 sm:pt-2 lg:pt-4 pb-10 sm:pb-3 lg:pb-6 xl:pb-6 2xl:pb-8 mx-auto xl:min-h-screen">
      {/* Hero Title Section */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="flex-1 h-full text-center sm:text-left"
      >
        <motion.h1
          variants={fadeUp}
          className="text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-6xl leading-tight"
        >
          Welcome to DIMCPrep:&nbsp;
          <span className="font-bold text-black">
          YOUR TRUSTED Online Question Bank for the Diploma in Immediate Medical Care.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 pb-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 text-justify"
        >
          Preparing for the Diploma in Immediate Medical Care (DipIMC) can be challenging, but with DIMC Prep, you don’t have to do it alone. Our advanced online question bank is designed specifically for healthcare professionals working in pre-hospital emergency medicine, including doctors, paramedics, and nurses.
        </motion.p>
        <motion.p className="mb-8 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 text-justify">
          The platform features 1200 expertly crafted questions, including three high-quality full mock exams, all mapped to the RCSEd DipIMC curriculum, with all answers referenced to resources such as JRCALC, RCUK, NARU, and the FPHC.
        </motion.p>

        <motion.button
          onClick={handleStartTest}
          variants={fadeUp}
          className="bg-[var(--secondary)] text-white rounded-md px-6 py-3 text-xs sm:text-sm md:text-base hover:opacity-90 transition cursor-pointer"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Hero Image Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeUp}
        className="relative flex-1 h-full lg:h-1/3 w-full max-w-md sm:max-w-full bg-cover bg-center"
      >
        {/* Overlay Image */}
        <div className="absolute top-0 left-0 w-full h-full z-0 sm:h-[60px] md:h-[350px] lg:h-[500px] xl:h-[800px]">
          <Image
            src={SquareBoxImg}
            alt="Square Box Background"
            title="Square Box Background"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover opacity-30"
          />
        </div>

        {/* Banner Image */}
        <div className="relative w-full min-h-[300px] sm:min-h-[100px] md:h-[500px] lg:h-[600px]">
          <Image
            src={Banner}
            alt="Hero Banner"
            title="Hero Banner"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>

        {/* Ratings Box with Badge */}
        <motion.div
          variants={springPop}
          className="absolute -top-2 sm:top-12 md:top-8 right-0 sm:right-12 md:-right-15 bg-white shadow-lg rounded-lg px-3 py-3 sm:px-4 sm:py-5 flex flex-col items-center md:scale-90"
        >
          <div className="bg-[#00a99d] text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full absolute -top-3 -right-2 flex items-center gap-1">
            <span className="text-yellow-500 text-sm sm:text-md">★</span>
            4.9
          </div>

          <div className="flex flex-col items-start gap-0 pt-1">
            <StarsRating />
            <p className="flex text-xs sm:text-sm md:text-base text-gray-600 mt-1 font-medium items-center gap-1 sm:gap-5">
              <span>Student Review</span>
              <Image
                src={VerifyBadge}
                alt="Verified badge"
                title="Verified badge"
                width={20}
                height={20}
                className="w-3 h-3 sm:w-5 sm:h-5 ml-1"
              />
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className="fixed inset-0 flex items-center justify-center p-0 sm:p-4  bg-opacity-50">
          <ModalThemeWrapper onClose={handleModalClose}>
            <div className="flex justify-center items-center h-full">
              <TestModalOne />
            </div>
          </ModalThemeWrapper>
        </div>
      </Modal>
    </section>
  );
};

export default HeroSection;
