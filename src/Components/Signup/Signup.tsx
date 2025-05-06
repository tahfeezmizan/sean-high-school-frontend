/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useRegisterMutation } from "@/Redux/apis/auth/authApi"
import { toast } from "sonner"



const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof signUpSchema>




export default function SignUpForm() {
  const router = useRouter()
  const [signup] = useRegisterMutation()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing again
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form data
      const validatedData = signUpSchema.parse(formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // register api call
      const response = await signup({
        name: validatedData.name,
        email: validatedData.email,
        password:validatedData.password
      })

      console.log(response, 'response in register');

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

      // Show success message or redirect
      toast.success(response.data?.message || "Account created successfully!")

      router.push('/signin')


    } catch (error:any) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const fieldErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormData] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        console.error("Submission error:", error)
        toast.error( error.data.message ||"An error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }




  return (
    <div className="w-full max-w-3xl px-4">
      <div className="text-center mb-8">
        <h1 className="text-[38px] font-bold text-gray-700 mb-2">Create a account</h1>
        <p className="text-gray-600">Join Our 100% Free Creative Network</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-gray-700 text-[18px]">
            Name <span className="text-gray-500">*</span>
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-transparent border rounded-xl text-gray-600 focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-4">{errors.name}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-gray-700 text-[18px]">
            Email <span className="text-gray-500">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-transparent border rounded-xl text-gray-500 focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-4">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-gray-700 text-[18px]">
            Password <span className="text-gray-500">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-transparent border rounded-xl text-gray-500 focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-4">{errors.password}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-[18px]">
            Confirm password <span className="text-gray-500">*</span>
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-transparent border rounded-xl text-gray-500 focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter your confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-4">{errors.confirmPassword}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 text-white font-medium rounded-full  focus:outline-none  focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  )
}
