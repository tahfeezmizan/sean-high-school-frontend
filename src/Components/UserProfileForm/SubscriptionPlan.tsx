

import { formatDateTime } from "../../../utils/formattedDate";
import { useGetMySubscriptionQuery } from "@/Redux/apis/subscription.ts/subscription";
import { TSubscription } from "../../../Type";
import LoadingSpinner from "../Loading/LoadingSpinner";




export default function SubscriptionPlan() {
    const { data, isLoading } = useGetMySubscriptionQuery({})

    // console.log(data?.data, 'subscription');
    const subscription: TSubscription = data?.data

    if (isLoading) {
        return <LoadingSpinner/>
    }

    const startDate = formatDateTime(subscription?.startDate);
    const endDate = formatDateTime(subscription?.endDate || "");
    return (
        <div className="max-w-md mx-auto mt-2">
            {isLoading ? (
                <LoadingSpinner/>
            ) : (
                    <div className="border border-gray-200 rounded-lg overflow-hidden space-y-4">

                        {/* Plan Type */}
                        <div className="grid grid-cols-2 px-4 py-3 bg-gray-100">
                            <div className="text-gray-700 font-medium">Your Plan</div>
                            <div className="text-right text-gray-700">{subscription?.plan?.planName}</div>
                        </div>

                        {/* Start Date */}
                        <div className="grid grid-cols-2 px-4 py-3 bg-gray-100">
                            <div className="text-gray-700 font-medium">Start date</div>
                            <div className="text-right text-gray-700">{startDate.formattedDate}</div>
                        </div>

                        {/* End Date */}
                        <div className="grid grid-cols-2 px-4 py-3 bg-gray-100">
                            <div className="text-gray-700 font-medium">End date</div>
                            <div className="text-right text-gray-700">{endDate.formattedDate}</div>
                        </div>

                        {/* Total Amount */}
                        <div className="grid grid-cols-2 px-4 py-3 bg-gray-100">
                            <div className="text-gray-700 font-medium">Total amount</div>
                            <div className="text-right text-gray-700">${subscription?.amount}</div>
                        </div>

                    </div>
            )
        }
        </div>
    )
}
