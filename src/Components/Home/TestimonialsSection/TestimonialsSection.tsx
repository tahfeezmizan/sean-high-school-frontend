
"use client"

import Image from "next/image";
import { QuoteIcon, Star } from "lucide-react";
import img from "../../../image/man.jpg";
import { useGetReviewForHomeQuery } from "@/Redux/apis/review.ts/reviewApi";
import { TTestimonialsType } from "../../../../Type";
import { Skeleton } from "antd";


export default function TestimonialsSection() {
  const { data, isLoading, isFetching } = useGetReviewForHomeQuery({})

  const loading = isLoading || isFetching;

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, j) => (
                  <Skeleton key={j} className="h-5 w-5 rounded-full mr-1" />
                ))}
              </div>

              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div className="flex items-center">
                <Skeleton className="w-14 h-14 rounded-full mr-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8  lg:mb-24">
      <div className="custom-container">
        <h2 className=" text-4xl lg:text-[48px] font-bold text-center text-gray-900 mb-4">
          What our client says
        </h2>
        <p className="text-center text-[#5C5C5C] text-[18px] mb-16 max-w-3xl mx-auto">
          Real feedback from students, parents, and institutions who have
          trusted us to provide fast, secure, and reliable high school
          transcripts.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data?.map((testimonial: TTestimonialsType) => (
            <div key={testimonial.id} className="flex flex-col  ">
              <div className="bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%   text-white p-6 rounded-lg mb-4 relative h-[200px]">
                <p className="text-gray-700 mb-6 relative pl-8">
                  <QuoteIcon className="absolute left-0 top-0 w-6 h-6 text-blue-200 opacity-80" />
                  <p className="text-white pl-8 mb-6 italic">
                    {testimonial.review}
                  </p>
                  <QuoteIcon className="absolute right-0 bottom-0 w-6 h-6 text-blue-200 opacity-80 rotate-180" />

                </p>
                <div className="absolute -bottom-4 left-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-t-[16px] border-t-[#2A89E2] border-r-[12px] border-r-transparent"></div>
              </div>

              <div className="flex flex-col justify-center items-center mt-3 ">
                <div className="">
                  <Image
                    src={testimonial.user?.profilePicture || img}
                    alt={testimonial.user?.name}
                    width={50}
                    height={50}
                    className=" w-[60px] h-[55px] border rounded-full"
                  />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.user?.name}
                  </h4>
                  <p className="text-gray-600 text-sm text-center">
                    {testimonial.user?.role}
                  </p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`block h-2 rounded-full ${i === 0 ? "w-8 bg-blue-500" : "w-2 bg-blue-200"
                  }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
