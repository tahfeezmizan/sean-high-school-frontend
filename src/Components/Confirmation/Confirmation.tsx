
"use client"


import { useGetMySubscriptionQuery } from "@/Redux/apis/subscription.ts/subscription";
import { CheckIcon } from "lucide-react"
import { TSubscription } from "../../../Type";
import { formatDateTime } from "../../../utils/formattedDate";


export default function Confirmation() {

 const {data} = useGetMySubscriptionQuery({})

  console.log(data?.data, 'subscription');
  const subscription: TSubscription = data?.data
  
  const startDate = formatDateTime(subscription?.startDate)
  const endDate = formatDateTime(subscription?.endDate || "")


  return (
    <div className="px-4 py-12">


      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-blue-500 text-white p-4 rounded-full mb-6">
          <CheckIcon className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your subscription has been successfully activated!</h1>
      </div>



      <div className="space-y-4">
        <div className=" border-gray-200 rounded-lg  space-y-4.5">
          <div className="flex justify-between p-4 border border-gray-200 rounded">
            <span className="font-medium">Your Plan</span>
            <span>{subscription?.plan?.planName}</span>
          </div>
          <div className="flex justify-between p-4 border border-gray-200 rounded">
            <span className="font-medium">Start date</span>
            <span>{startDate.formattedDate}</span>
          </div>
          <div className="flex justify-between p-4 border border-gray-200 rounded">
            <span className="font-medium">End date</span>
            <span>{endDate.formattedDate}</span>
          </div>
          <div className="flex justify-between p-4 border border-gray-200 rounded">
            <span className="font-medium">Total amount</span>
            <span>${ subscription?.amount}</span>
          </div>
        </div>

        
      </div>
    </div>
  )
}
