"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Star } from "lucide-react"
import { Button } from "@/ui/Button"
import { useCreateReviewMutation } from "@/Redux/apis/review.ts/reviewApi"// or your preferred toast library
import { toast } from "sonner"

const formSchema = z.object({
  rating: z.number().min(1, { message: "Please select a rating" }).max(5),
  review: z.string().min(10, { message: "Review must be at least 10 characters" }),
})

export default function ReviewForm() {
  const [hoveredRating, setHoveredRating] = useState(0)
  const [createReview, { isLoading: isCreatingReview }] = useCreateReviewMutation()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isDirty, isValid }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
    mode: "onChange" // Validate on change for better UX
  })

  const currentRating = watch("rating")

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await createReview(values).unwrap()
      console.log(response, 'review');
      toast.success("Review submitted successfully!")
      reset()
    } catch (error) {
      toast.error("Failed to submit review. Please try again.")
      console.error("Review submission error:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your review</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="text-base block mb-2">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setValue("rating", star, { shouldValidate: true })}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${star <= (hoveredRating || currentRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"}`}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-sm text-red-500 mt-1">{errors.rating.message}</p>
          )}
        </div>

        {/* Review Text */}
        <div>
          <label className="text-base block mb-2">
            Review text <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("review")}
            placeholder="Share your experience (minimum 10 characters)"
            className="w-full min-h-[150px] p-3 border rounded-md resize-none focus:outline-none 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-200"
          />
          {errors.review && (
            <p className="text-sm text-red-500 mt-1">{errors.review.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isDirty || !isValid || isCreatingReview}
            className={`w-full sm:w-auto px-8 py-3 text-white bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40% hover:from-blue-500 hover:to-blue-700
                      rounded-full transition-colors ${isCreatingReview ? 'opacity-70 cursor-not-allowed' : ''
                      } `}
          >
            {isCreatingReview ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </div>
  )
}