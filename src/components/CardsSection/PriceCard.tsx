"use client";
import plans, { PricePlan } from "./pricePlans";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateCheckoutSessionMutation } from "@/redux/api/stripeApi/stripeApi";
import { useGetProfileQuery } from "@/redux/api/updateProfile/profile";
import { useEffect, useState } from "react";

const PriceCard = () => {
  const router = useRouter();
  const [createCheckoutSession, { isLoading }] = useCreateCheckoutSessionMutation();
  const user = useSelector((state: any) => state.user.user);
  const { data: userData } = useGetProfileQuery();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [filteredPlans, setFilteredPlans] = useState<PricePlan[]>([]);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  const pricePlans: PricePlan[] = [...plans].reverse();

  useEffect(() => {
    if (userData?.user || user) {
      setUserInfo(userData?.user || user);
    }
  }, [userData, user]);

  useEffect(() => {
    const allPlans = [...plans].reverse();
    setFilteredPlans(allPlans);
  }, []);

  const handleCheckout = async (plan: PricePlan) => {
    if (!user) {
      toast.warning("Please log in to start the checkout process.");
      router.push("/signIn");
      return;
    }

    if (plan.isMilitary && !userInfo?.email?.endsWith("@mod.gov.uk")) {
      toast.error(
        "Only military personnel with a valid MODNET email can access this plan."
      );
      return;
    }

    const subscriptions = user?.subscriptions || [];
    const activeSubscription = subscriptions.find(
      (sub: any) => sub?.isActive === true
    );

    if (activeSubscription) {
      toast.info("You already have an active subscription.");
      return;
    }

    setProcessingPlanId(plan.id);
    try {
      const res = await createCheckoutSession({
        priceId: plan.id,
        planDuration: plan.duration,
      }).unwrap();

      if (res.success && res.url) {
        window.location.href = res.url;
      } else {
        toast.error("Failed to start checkout session.");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error?.data?.message || "Something went wrong during checkout.");
    } finally {
      setProcessingPlanId(null);
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12 px-4">
      {filteredPlans.map((plan) => (
        <div
          key={plan.title}
          className={`flex flex-col justify-between border ${
            plan.isMilitary ? "border-2 border-blue-500" : "border-slate-200"
          } shadow-lg p-4 sm:p-6 bg-white rounded-xl relative hover:shadow-xl transition-shadow duration-300`}
        >
          <div className="flex flex-col justify-between pb-6">
            <h4 className="text-base sm:text-lg font-semibold leading-5 mb-4">
              {plan.duration} {plan.duration === 1 ? "month" : "months"}
            </h4>

            {plan.isMilitary ? (
              <p className="absolute top-3 right-3 bg-[var(--badgeColor)] text-white px-2 py-0.5 rounded-full shadow-md text-xs font-semibold tracking-wide">
                Military Only
              </p>
            ) : plan?.value ? (
              <p className="absolute top-3 right-3 bg-[var(--badgeColor)] text-white px-2 py-0.5 rounded-full shadow-md text-xs font-semibold tracking-wide">
                ★ Best Value
              </p>
            ) : (
              ""
            )}

            <h3 className="text-3xl sm:text-4xl font-bold text-left">{plan.price}</h3>
            <p className="mt-4 text-gray-400 text-sm sm:text-base text-left">{plan.title}</p>
            <hr className="border-gray-200 mt-4" />

            <div className="flex flex-col">
              {plan.description.map((item, index) => (
                <div key={index} className="flex items-start gap-3 py-2 mt-3">
                  <span className="text-black text-base sm:text-lg">✔</span>
                  <p className="text-black text-sm sm:text-md mt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleCheckout(plan)}
            disabled={processingPlanId === plan.id || isLoading}
            className={`w-fit py-2 px-4 bg-[#20B2AA] hover:bg-teal-800 text-white text-sm sm:text-base rounded-full mt-4 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer`}
          >
            <p className="px-2 py-1 text-base sm:text-lg">
              {processingPlanId === plan.id ? "Processing..." : "Get Started"}
            </p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default PriceCard;
