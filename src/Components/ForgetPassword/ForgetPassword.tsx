/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForgotPasswordMutation } from "@/Redux/apis/auth/authApi"
import { Input } from "@/ui/Input"
import Link from "next/link"
import { Button } from "@/ui/Button"
import { toast } from "sonner"
import { useState } from "react"
import ResetPasswordSuccess from "./ResetPasswordSuccess"


const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export default function ForgotPasswordForm() {

  const [forgetPassword,] = useForgotPasswordMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    setIsSubmitting(true)
    try {
      const res = await forgetPassword(values).unwrap()
      // console.log(res, 'res');
      toast.success(res.data.message || "Send Link via your email")
      setIsSuccess(true)
    } catch (error:any) {
      console.error("Error:", error);
      toast.error(
        error.data?.message ||
        error.error ||
        "Failed to send reset link. Please try again."
      );
    } finally {
      setIsSubmitting(false)
    }
  }


  if (isSuccess) {
    return <ResetPasswordSuccess setIsSuccess={setIsSuccess} />
  }
  return (
    <div className="w-full max-w-3xl px-4 mt-10">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Forgot password</h1>
          <p className="mt-2 text-gray-600">Join Our 100% Free Creative Network</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-base mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className="h-12"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex items-center text-sm">
            <span>Remember the password?</span>
            <Link href="signin" className="ml-1 text-blue-500 hover:underline">
              Log In
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full  bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-4.5 px-10 rounded-full text-white cursor-pointer"
          >
            {isSubmitting ? "Sending..." : " Send Link"}
          </Button>

          <div className="flex justify-center items-center text-sm">
            <span>Have an account?</span>
            <Link href="/signup" className="ml-1 text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
