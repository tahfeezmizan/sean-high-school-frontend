/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/ui/Input";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

// Stripe Elements wrapper

const CheckoutForm = ({
  clientSecret,
  plan,
  user,
}: {
  clientSecret: string;
  plan: any;
  user: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      address: "",
      additional: "",
      region: "",
      zipCode: "",
    },
  });

  const onSubmit = async (data: any) => {
    console.log("From Data", data);
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setStripeError(null);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: data.name,
              address: {
                line1: data.address,
                city: data.region,
                postal_code: data.zipCode,
                country: "US", // Adjust based on your needs
              },
              email: user?.email,
            },
          },
        }
      );
      if (error) {
        setStripeError(error.message || "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        toast.success("Payment Successful");
        router.push("/confirmation");
      }
    } catch (err) {
      setStripeError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
    hidePostalCode: true,
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-8"
      >
        {/* Left column - Billing Info (same as before) */}
        <div className="space-y-6">
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Billing Information!</h2>

            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="name"
                    {...field}
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg "
                    placeholder="Enter your name"
                  />
                )}
              />
              {errors.name && <p className="text-red-500">Name is required</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="block font-medium">
                Address <span className="text-red-500">*</span>
              </label>
              <Controller
                name="address"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    id="address"
                    {...field}
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Enter your address"
                  />
                )}
              />
              {errors.address && (
                <p className="text-red-500">Address is required</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="additional" className="block font-medium">
                Additional Information
              </label>
              <Controller
                name="additional"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="additional"
                    {...field}
                    className="w-full p-3 border rounded-lg min-h-[120px] border-gray-200 focus:outline-none"
                    placeholder="Enter additional information"
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Right column - Payment */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-6">Payment Method</h2>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="block font-medium mb-2">
                Card Information <span className="text-red-500">*</span>
              </label>
              <div className="p-3 border border-gray-300 rounded-lg">
                <CardElement options={cardElementOptions} />
              </div>
            </div>

            {stripeError && (
              <div className="text-red-500 p-2 bg-red-50 rounded-lg">
                {stripeError}
              </div>
            )}

            <div className="border border-gray-200 rounded-lg p-4 space-y-2">
              <label className="block font-medium mb-2">
                Country or Origin <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <Controller
                  name="region"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="region"
                      {...field}
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter your region"
                    />
                  )}
                />
                {errors.region && (
                  <p className="text-red-500">Region is required</p>
                )}
              </div>

              <div className="space-y-2">
                <Controller
                  name="zipCode"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      id="zipCode"
                      {...field}
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Enter your ZIP code"
                    />
                  )}
                />
                {errors.zipCode && (
                  <p className="text-red-500">ZIP code is required</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || !stripe}
              className="w-full bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40% hover:from-blue-500 hover:to-blue-700 py-3.5 px-10 rounded-full text-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : `Pay $${plan?.data?.price}`}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
