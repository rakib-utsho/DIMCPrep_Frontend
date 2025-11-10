import ProfileHeader from '@/components/UserProfile/ProfileHeader';
import ProfilePerformanceChart from '@/components/UserProfile/ProfilePerformanceChart';
import ProfileQuestionSummary from '@/components/UserProfile/ProfileQuestionSummary';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile',
}


const page = () => {
    return (
        <div>
            <h1 className="text-center text-[#000000] mt-10 sm:mt-40 text-2xl sm:text-4xl font-bold">
                My Test Performance
            </h1>

            <ProfileHeader />
            <ProfilePerformanceChart />
            <ProfileQuestionSummary />
        </div>
    );
};

export default page;  