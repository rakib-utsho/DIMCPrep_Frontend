'use client';
import { Performance, useGetPerformanceQuery } from '@/redux/api/MyTestPerformance/MyTestPerformance';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ProfileHeader: React.FC = () => {
  const { data: performanceData, isLoading } = useGetPerformanceQuery();
  const performance: Performance | undefined = performanceData?.data as Performance | undefined;

  const timeInMinutes = Math.round((performance?.totalTimeTakenInSeconds || 0) / 60);

  const profileStats = [
    {
      id: 1,
      image: '/images/speed.png',
      value: `${performance?.averageScore}%`,
      label: 'Average Score',
    },
    {
      id: 2,
      image: '/images/text.png',
      value: `${performance?.totalExams || 0}`,
      label: 'Total Tests Taken',
    },
    {
      id: 3,
      image: '/images/time.png',
      value: `${timeInMinutes} Min`,
      label: 'Time Taken',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (!performance) {
    return <p className="text-center text-red-500">Failed to load performance data.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 bg-[#F9F9FA] p-4 sm:p-6 rounded-lg mx-auto mt-6 max-w-[1024px]">
      {profileStats?.map((stat) => (
        <div
          key={stat?.id}
          className="flex flex-col items-center justify-center w-full sm:w-[260px] md:w-[280px] lg:w-[300px] min-h-[180px] bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-5"
        >
          <Image
            src={stat?.image}
            alt={stat?.label}
            width={50}
            height={50}
            className="object-contain"
          />
          <div className="text-center mt-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3795FA]">{stat.value}</p>
            <p className="text-[#000000] text-sm sm:text-base md:text-lg mt-1 font-semibold">
              {stat?.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileHeader;
