import ReviewForm from "@/components/Review/ReviewForm";

import React from "react";


import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Review Us',
}



const page = () => {
  return (
    <div>
      <ReviewForm />
    </div>
  );
};

export default page;
