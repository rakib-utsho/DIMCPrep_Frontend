import TestHistory from '@/components/TestHistory/TestHistory';
import React from 'react';


import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Test History',
}


const page = () => {
    return (
        <div>
            <TestHistory />
        </div>
    );
};

export default page;