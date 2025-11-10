"use client";
import Image from "next/image";
import React from "react";
import HexPattern from "@/assets/extra/hexagon-pattern.png";
import PriceCard from "./PriceCard";

const PricingSection = () => {
  return (
    <section
      id="pricing-section"
      className="relative bg-[var(--primary)] overflow-hidden py-10 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-[100px] xl:px-[100px]"
    >
      {/* Background Pattern - Now with priority if it's above the fold */}
      <div className="absolute bottom-0 left-0 w-full h-full z-0">
        <Image
          src={HexPattern}
          alt="Hexagon background pattern"
          title="Hexagon background pattern"
          fill
          priority // Added priority for LCP element
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight tracking-tight">
            Built for Success. Backed by Experience.
          </h2>
          <div className="flex justify-center mb-6 mt-2">
            <svg
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true" // Decorative SVG
            >
              <path
                d="M0 10H10L13 3L18 17L23 7L26 10H40"
                stroke="#20B2AA"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="mt-4 max-w-4xl text-md md:text-lg text-gray-500 mx-auto">
            <p className="mb-3">
              This isn't just another educational platform. DIMC Prep is the
              first and only comprehensive online question bank developed
              exclusively for the DipIMC, commonly referred to as “the Dip”,
              administered by the Royal College of Surgeons of Edinburgh
              (RCSEd).
            </p>
            <span className="pt-16">
              Every question is aligned with the RCSEd DipIMC curriculum,
              ensuring you're preparing with the most relevant and up-to-date
              material for a Level 6 provider in PHEM.
            </span>
          </div>
        </div>

        <div className="mt-10">
          <PriceCard />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
