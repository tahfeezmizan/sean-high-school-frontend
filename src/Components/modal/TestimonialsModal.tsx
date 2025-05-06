/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from "next/link";
import { TTestimonialsType } from "../../../Type";
import { Star } from "lucide-react";
import { useAddReviewOnHomepageMutation } from "@/Redux/apis/review.ts/reviewApi";
import { toast } from "sonner";



interface TOderModalProps {
  selectedOrder: TTestimonialsType | null;
  closeModal: () => void;
}





const TestimonialsModal = ({ selectedOrder, closeModal }: TOderModalProps) => {

  const [addOnHomePage] = useAddReviewOnHomepageMutation()

  const handleAddOnWebsite = async() => {
  try {
   await addOnHomePage({id:selectedOrder?.id}).unwrap()
  
    toast.success("Added review on home page successfully")
    closeModal()
  } catch (error: any) {
    console.log(error);
    closeModal()
    toast.error(error.data?.message || "Failed to add review on home page")
  }
}


  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center  z-50">
        <div className="bg-white px-9 pb-10 pt-12 rounded-lg shadow-lg w-full max-w-4xl relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500 cursor-pointer font-bold"
          >
            ✕
          </button>
          <h3 className="text-[32px] text-[#333333] font-semibold mb-4">User information</h3>




          <div className="border border-gray-200 rounded-lg p-6">
            {/* user information design  */}
            <div className="grid grid-cols-2 py-4 border-b border-gray-200">
              <h1 className="text-[#333] text-[19px] ">Name:</h1>
              <h1 className="text-[#5C5C5C] text-[18px]">{selectedOrder?.user?.name}</h1>
            </div>


            <div className="grid grid-cols-2 py-4 border-b border-gray-200">
              <h1 className="text-[#333] text-[19px] ">Email:</h1>
              <h1 className="text-[#5C5C5C] text-[18px]">{selectedOrder?.user?.email}</h1>
            </div>


            <div className="grid grid-cols-2 py-4 border-b border-gray-200">
              <h1 className="text-[#333] text-[19px]">Ratings:</h1>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={
                      star <= (selectedOrder?.rating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="ml-2 text-[#5C5C5C] text-[18px]">
                  ({selectedOrder?.rating})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 py-4 border-b border-gray-200 ">
              <h1 className="text-[#333] text-[19px] ">Review:</h1>
              <h1 className="text-[#5C5C5C] text-[18px]">{selectedOrder?.review}</h1>
            </div>

            <div className="flex justify-end !mt-8">
              <button onClick={ handleAddOnWebsite}>
                <Link href="#" className="bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-3.5 px-10 rounded-xl !text-white cursor-pointer"> {selectedOrder?.isOnHomePage ? "Remove from website" : "Add on Website"} </Link> 
              </button>
            </div>


          </div>




        </div>
      </div>
    </div>
  )
}

export default TestimonialsModal