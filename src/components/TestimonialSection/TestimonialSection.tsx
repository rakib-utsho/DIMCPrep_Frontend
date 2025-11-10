"use client";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import UserImg from "@/assets/extra/userImg.png";
import SquarePattern from "@/assets/extra/squreBox.png";
import SquareRotted from "@/assets/extra/squreBox-roted.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useGetAllReviewsQuery } from "@/redux/api/review/reviewApi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TestimonialSection = () => {
  const swiperRef = useRef<any>(null);
  const {
    data: reviews,
    isLoading,
    isError,
    refetch,
  } = useGetAllReviewsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-xl md:text-2xl ${
              i < Math.floor(rating) ? "text-[#E17A26]" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <motion.section
        className="py-12 sm:py-16 px-4 sm:px-6 bg-[var(--bgColor)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-block text-[#168B86] text-lg sm:text-xl md:text-2xl font-semibold animate-pulse"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Reviews...
          </motion.div>
        </div>
      </motion.section>
    );
  }

  if (isError || !reviews) {
    return (
      <motion.section
        className="py-12 sm:py-16 px-4 sm:px-6 bg-[var(--bgColor)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-block text-red-500 text-lg sm:text-xl md:text-2xl font-semibold"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            Error loading reviews
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-[100px] xl:px-[120px] bg-[var(--bgColor)] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-60 h-60 sm:w-100 sm:h-100 md:w-120 md:h-120 opacity-40">
        <Image
          src={SquarePattern}
          alt="Decorative square pattern"
          title="Decorative square pattern"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-60 h-60 sm:w-100 sm:h-100 md:w-120 md:h-120 opacity-40">
        <Image
          src={SquareRotted}
          alt="Decorative rotated square pattern"
          title="Decorative rotated square pattern"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.h4
          className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-center text-black mb-8 sm:mb-10 md:mb-12 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          DIMCPrep.com is trusted by candidates preparing for their Diploma in
          Immediate Medical Care exam as the class-leading online question bank.
        </motion.h4>

        {/* Swiper Container */}
        <div className="relative px-6 sm:px-8 md:px-10 overflow-hidden">
          {/* Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 border-1 border-[#168B86] rounded-md mr-1 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <div className="p-1.5 bg-[#168B86] rounded-md m-0.5">
              <FaArrowLeft className="text-white text-md" />
            </div>
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 border-1 border-[#168B86] rounded-md ml-1 cursor-pointer"
            aria-label="Next testimonial"
          >
            <div className="p-1.5 bg-[#168B86] rounded-md m-0.5">
              <FaArrowRight className="text-white text-md" />
            </div>
          </button>

          {/* Swiper Component */}
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={1}
              spaceBetween={10}
              loop={false}
              pagination={{
                el: ".custom-swiper-pagination",
                clickable: true,
                renderBullet: (index, className) =>
                  `<span class="${className} custom-bullet"></span>`,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
                1280: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
              }}
              modules={[Navigation, Pagination]}
            >
              {reviews?.reviews?.map((review) => (
                <SwiperSlide key={review.id}>
                  <motion.div
                    className="mx-4 h-full flex flex-col relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <div className="bg-white shadow rounded-xl p-2 sm:p-1 md:p-6 relative">
                      {/* Diamond positioned at middle of card border */}
                      <div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 z-20 shadow-lg"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                          backgroundColor: "white",
                        }}
                      />

                      {/* Quote Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 559.27 546.15"
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mx-auto mb-2 sm:mb-3 text-[var(--quoteColor)] fill-current"
                        aria-hidden="true"
                      >
                        <path d="M336.63,250.54V33.44H553.71v217.1S587.7,503,364.37,512.71V392s85.76,35.63,74.55-141.49Z" />
                        <path d="M3.71,250.54V33.44H220.79v217.1S254.78,503,31.46,512.71V392S117.21,427.66,106,250.54Z" />
                      </svg>

                      {/* Star Rating */}
                      <div className="flex justify-center items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                        {renderStars(review.rating)}
                        <span className="ml-1 sm:ml-2">
                          <span className="font-bold text-base sm:text-lg md:text-xl">
                            {review.rating.toFixed(1)}
                          </span>
                          <span className="text-xs sm:text-sm md:text-base ml-1">
                            Rating
                          </span>
                        </span>
                      </div>

                      {/* Comment */}
                      <div className="text-[var(--secondary)] text-xs sm:text-sm md:text-base lg:text-lg text-center mb-4 sm:mb-5 md:mb-6 leading-relaxed">
                        <p>{review.review}</p>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col items-center">
                      <Image
                        src={review?.user?.imageURL || UserImg}
                        alt={`${review.user?.name || "User"}'s profile`}
                        title="User Profile"
                        width={60}
                        height={60}
                        className="rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = UserImg.src;
                        }}
                      />
                      <p className="font-semibold text-black text-sm sm:text-base mt-1 sm:mt-2 truncate">
                        {review?.user?.name ?
                        review?.user?.name.charAt(0).toUpperCase() + review?.user?.name.slice(1) : ""}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Pagination Position */}
            <div className="custom-swiper-pagination mt-10 flex justify-center" />
          </div>
        </div>
      </div>
      {/* Custom Pagination Bullet Style */}
      <style jsx global>{`
        .swiper-pagination-bullet.custom-bullet {
          background-color: #d1d1d1;
          opacity: 1;
          width: 10px;
          height: 10px;
          margin: 0 5px;
          border-radius: 9999px;
          transition: background-color 0.3s ease;
        }

        .swiper-pagination-bullet.custom-bullet.swiper-pagination-bullet-active {
          background-color: #20b2aa;
        }
      `}</style>
    </motion.section>
  );
};

export default TestimonialSection;
