import Link from "next/link"
import { LogOut } from "lucide-react"
import { Button } from "@/ui/Button"



export default function GetPlan () {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 border-2 border-gray-200">
            <p>image</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Liam Brown</h2>
            <p className="text-gray-500">alexarawles@gmail.com</p>
          </div>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">Your Plan</span>
              <span>Weekly</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">Start date</span>
              <span>22/04/2025</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">End date</span>
              <span>29/04/2025</span>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="font-medium">Total amount</span>
              <span>$9.99</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/subscribe">
              <Button className="w-full bg-blue-500 hover:bg-blue-600">Get a plan</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              defaultValue="Liam Brown"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              defaultValue="alexarawles@gmail.com"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
