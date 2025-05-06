/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllPlanQuery } from "@/Redux/apis/plan.ts/planApi";
import { Check } from "lucide-react";
import { TPlan } from "../../../../Type";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateSubscriptionMutation } from "@/Redux/apis/subscription.ts/subscription";
import LoadingSpinner from "@/Components/Loading/LoadingSpinner";
import { toast } from "sonner";

export default function PricingSection() {
  const router = useRouter();
  const { data, isLoading, error } = useGetAllPlanQuery({});
  const [createSubscription, { isLoading: isCreatingSubscription }] =
    useCreateSubscriptionMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubscription = async (
    planId: string,
    slug: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault(); // Prevent default link behavior
    setErrorMessage(null);

    try {
      const response = await createSubscription({ planId }).unwrap();
      console.log(response, "response");

      // If successful, redirect to payment page or confirmation
      if (response?.data?.subscription) {
        router.push(
          `/pricing/${slug}?clientSecret=${encodeURIComponent(
            response.data.clientSecret
          )}`
        );
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to create subscription");
      setErrorMessage(err?.data?.message || "Failed to create subscription");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <section className="max-w-5xl mx-auto py-8">
        <div className="text-center text-red-500">Error loading plans</div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-[48px] font-bold text-center text-[#333] mb-16">
          Pricing
        </h2>

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {data?.data?.map((plan: TPlan) => (
            <div
              key={plan.id}
              className={`${
                plan.planName === "Monthly Plan"
                  ? "bg-amber-50"
                  : "bg-[#E5F2FC]"
              } rounded-md p-8`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {plan.planName}
              </h3>
              <p className="text-[18px] font-[500] text-gray-600 mb-6">
                {plan.description}
              </p>

              <div className="pb-4 border-gray-300 border-b">
                <span className="text-4xl font-bold text-gray-700">
                  ${plan.price}
                </span>
                <span className="text-gray-600 ml-2">
                  /per {plan.planName === "Monthly Plan" ? "month" : "week"}
                </span>
              </div>

              <div className="flex flex-col justify-between">
                <div className="pt-4">
                  <h4 className="text-gray-600 text-[18px] font-[500] mb-4">
                    What's included
                  </h4>

                  <ul className="space-y-3">
                    {plan.included.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-[18px] font-[500] text-gray-600">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/pricing/${plan.slug}`}
                  onClick={(e) => handleSubscription(plan.id, plan.slug, e)}
                  className="block mt-5"
                >
                  <button
                    disabled={isCreatingSubscription}
                    className={`w-full text-white bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40% hover:from-blue-500 hover:to-blue-700 py-3 rounded-lg cursor-pointer ${
                      isCreatingSubscription
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isCreatingSubscription ? "Processing..." : "Get Started"}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
