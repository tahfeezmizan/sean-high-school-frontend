
"use client"

import { useGetPlanBySlugQuery } from "@/Redux/apis/plan.ts/planApi";
import { useAppSelector } from "@/Redux/hook";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from '@stripe/stripe-js';
import {  useEffect } from 'react';
import {
  Elements,
} from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutFrom";

// Stripe Elements wrapper
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPricing({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get('clientSecret');

  const { data: plan, isLoading } = useGetPlanBySlugQuery(slug);

  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    if (!clientSecret) {
      router.push('/pricing');
    }
  }, [clientSecret, router]);

  if (isLoading || !clientSecret) {
    return <div>Loading...</div>;
  }

 

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">{plan?.data?.planName}</h1>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm
          clientSecret={clientSecret}
          plan={plan}
          user={user}
        />
      </Elements>
    </div>
  );
}
