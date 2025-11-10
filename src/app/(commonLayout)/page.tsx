import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import SampleQuestion from "@/components/QuestionSection/SampleQuestion";
import ProgressDashboard from "@/components/ProgressDashboard/ProgressDashboard";
import TestimonialSection from "@/components/TestimonialSection/TestimonialSection";
import FeaturesSection from "@/components/FeaturesSection/FeaturesSection";
import PricingSection from "@/components/CardsSection/PricingSection";

const page = () => {
  return (
    <div>
      <HeroSection />
      <PricingSection />
      <SampleQuestion />
      <ProgressDashboard />
      <TestimonialSection />
      <FeaturesSection />
    </div>
  );
};

export default page;
