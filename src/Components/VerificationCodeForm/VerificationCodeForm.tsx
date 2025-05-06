"use client"

import type React from "react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Check } from "lucide-react"
import { Button } from "@/ui/Button"
import { useRouter } from "next/navigation"


const formSchema = z.object({
  code: z.string().length(6, { message: "Verification code must be 6 digits" }),
})

export default function VerificationCodeForm() {
  const router = useRouter()
  const [code, setCode] = useState(["", "", "", "", "", ""])
  


  // Change here: inputRefs is now an array of RefObjects
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0]
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    form.setValue("code", newCode.join(""))
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleCodeSubmit = () => {
    console.log("handle code submitted clieck");
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const verificationCode = code.join("")
    console.log({ verificationCode })

    const isValid = verificationCode.length === 6 && /^\d+$/.test(verificationCode)
    if (!isValid) {
      form.setError("code", {
        type: "manual",
        message: "Verification code must be exactly 6 digits",
      })
      return
    }

    // Submit to your API here
    window.location.href = "#reset"

    router.push('/resetPassword')
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500 rounded-full p-4">
            <Check className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Success</h1>
        <p className="mt-2 text-gray-600">Join Our 100% Free Creative Network</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }} // Using the standard functional ref
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {form.formState.errors.code && (
          <p className="text-red-500 text-center text-sm">
            {form.formState.errors.code.message}
          </p>
        )}

        <Button onClick={()=> handleCodeSubmit()} type="submit" className="w-full  bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-4.5 px-10 rounded-full text-white cursor-pointer">
          Submit
        </Button>
      </form>
    </div>
  )
}
