"use client";

import { Check, Popcorn, SquareArrowDownLeft } from "lucide-react";
import Link from "next/link";


export default function UserPricing() {
  return (
    <div className=" px-4 md:px-6 ">
      <div className="flex justify-between items-center">
        <h2 className="text-[24px] font-bold  text-[#333] my-10">Pricing</h2>

        <button>
          <Link
            href="/dashboard/addPricing"
            className="bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-3.5 px-10 rounded-xl text-white cursor-pointer "
          >
            Add pricing plan
          </Link>
        </button>
      </div>

      <div className="max-w-7xl ">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Weekly Plan */}
          <div className="bg-[#E5F2FC] rounded-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Weekly Plan
            </h3>
            <p className="text-[18px] font-[500] text-gray-600 mb-6">
              A flexible plan for those who need quick access to official
              transcripts with no long-term commitment.
            </p>

            <div className="pb-4 border-gray-300 border-b">
              <span className="text-4xl font-bold text-gray-700">$9.99</span>
              <span className="text-gray-600 ml-2">/per week</span>
            </div>

            <div className="h-[300px] flex flex-col justify-between ">
              <div className="pt-4">
                <h4 className="text-gray-600 text-[18px] font-[500] mb-4">
                  Whats included
                </h4>

                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      One transcript per week
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      No storage of previous transcripts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      Instant Delivery
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      Easy, secure payment methods
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      Pause or cancel anytime
                    </span>
                  </li>
                </ul>
              </div>

              {/* <button className="w-full text-white bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-3 rounded-lg cursor-pointer">
                Get Started
              </button> */}

              <div className="flex gap-2.5 justify-end text-[#5C5C5C] ">
                <Popcorn/>
                <SquareArrowDownLeft/>
              </div>


            </div>
          </div>

          {/* Monthly Plan */}
          <div className="bg-amber-50 rounded-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Monthly Plan
            </h3>
            <p className="text-[18px] font-[500] text-gray-600 mb-6">
              A perfect solution for those who require regular access to
              transcripts with ongoing support.
            </p>

            <div className="pb-4 border-gray-300 border-b">
              <span className="text-4xl font-bold text-gray-700">$29.99</span>
              <span className="text-gray-600 ml-2">/per month</span>
            </div>

            <div className=" h-[300px]  flex flex-col justify-between ">
              <div className="pt-4">
                <h4 className="text-gray-600 text-[18px] font-[500]  mb-4">
                  Whats included
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      After the first month, youll be charged $9.99 monthly.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      Create and store transcripts for up to 10 students
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      Instant Delivery
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      Easy, secure payment methods
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-[18px] font-[500] text-gray-600">
                      Pause or cancel anytime
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-2.5 justify-end text-[#5C5C5C] ">
                <Popcorn/>
                <SquareArrowDownLeft/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
