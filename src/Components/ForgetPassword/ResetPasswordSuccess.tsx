/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Link from "next/link"
import { Button } from "@/ui/Button"
import { CheckCircle2 } from "lucide-react"

export default function ResetPasswordSuccess({ setIsSuccess }: any) {
    return (
        <div className="w-full max-w-3xl px-4 mt-10">
            <div className="space-y-6 text-center">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>

                {/* Success Message */}
                <h1 className="text-3xl font-bold tracking-tight">
                    Password Reset Link Sent!
                </h1>
                <p className="text-gray-600">
                    We’ve sent a password reset link to your email. Please check your inbox (and spam folder).
                </p>

                {/* Back to Login Button */}
                <div className="pt-4">
                    <Link href="/signin">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 py-4.5 px-10 rounded-full text-white">
                            Back to Login
                        </Button>
                    </Link>
                </div>

                {/* Additional Help (Optional) */}
                <p className="text-sm text-gray-500">
                    Didn’t receive the email?{" "}
                    <button
                        onClick={() => setIsSuccess(false)}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Resend Link
                    </button>
                </p>
            </div>
        </div>
    )
}