/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/ui/Button"
import { Input } from "@/ui/Input"
import { useResetPasswordMutation } from "@/Redux/apis/auth/authApi"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function ResetPasswordForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [resetPassword] = useResetPasswordMutation()
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');
  // console.log(userId, token);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId || !token) {
      console.error("Missing userId or token");
      return;
    }
    console.log(values)
    try {
      const body = {
        userId,
        password: values.password
      }
      // Submit to your API here
      const response = await resetPassword({ body, token }).unwrap()
      console.log(response, 'res in reset');
      form.reset()
      toast.success("Password reset successfully!")
      // Redirect to login page
      router.push('/signin')
    } catch (error:any) {
      console.log(error);
      toast.error(error.data?.message || "Failed to reset password. Please try again.")
    }
  }

  return (
    <div className="w-full max-w-3xl px-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Reset Password</h1>
        <p className="mt-2 text-gray-600">Join Our 100% Free Creative Network</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="text-base">
            New password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...form.register("password")}
              className="h-12 w-full pr-10 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="text-base">
            Confirm password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...form.register("confirmPassword")}
              className="h-12 w-full pr-10 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {form.formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full  bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-4.5 px-10 rounded-full text-white cursor-pointer">
          Reset password
        </Button>
      </form>
    </div>
  )
}
