"use client"

import type React from "react"

import { useState } from "react"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"




export default function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    setEmail("")
    // You would typically send this to your API
  }





  return (
    <div> 
    <div className="bg-[#2A89E2] py-12 px-4 sm:px-6 lg:px-8 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold text-white">Subscribe Newsletter</h2>
          </div>

          <div className="w-full md:w-auto bg-[#FFFFFF] py-1 px-1 rounded-full">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full md:w-80 px-4 py-3 rounded-l-full focus:outline-none"
              />
              <button
                type="submit"
                className="bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 cursor-pointer   text-white font-medium px-6 py-3   rounded-full transition duration-150 ease-in-out"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>

      
    </div>


      <div className="mt-10 pb-10 border-b border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="flex flex-wrap justify-center md:justify-start gap-8 mb-6 md:mb-0">
            <Link href="/" className="text-gray-900 font-[500] text-[18px] ">
              Home
            </Link>
            <Link href="/create" className="text-gray-900 font-[500] text-[18px] ">
              Create Your Transcript
            </Link>
            <Link href="/pricing" className="text-gray-900 font-[500] text-[18px] ">
              Pricing
            </Link>
            <Link href="/faq" className="text-gray-900 font-[500] text-[18px] ">
              FAQ
            </Link>
          </nav>

          <div className="flex space-x-4">
            <Link href="#" className="text-gray-900 font-[500] text-[18px] ">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-900 font-[500] text-[18px] ">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-900 font-[500] text-[18px] ">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-900 font-[500] text-[18px] ">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>



     </div>

  )
}
