"use client"

import { CustomDialogFooter } from "@/ui/custom-dialog"
import { Input } from "@/ui/Input"
import { Label } from "@/ui/label"
import { useState } from "react"



interface StudentInfo {
  schoolName: string;
  schoolAddress: string;
  studentName: string;
  studentAddress: string;
  dateOfBirth: string;
  graduationDate: string;
  volunteerHours: string;
  awards: string;
  testName: string;
  testScore: string;
  testDate: string;
  schoolLogo: File | null;
}


interface TranscriptEditFormProps {
  studentInfo: StudentInfo
  onSubmit: (updatedInfo: StudentInfo) => void
}

export default function TranscriptEditForm({ studentInfo, onSubmit }: TranscriptEditFormProps) {
  const [formData, setFormData] = useState<StudentInfo>({ ...studentInfo })





  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)

    console.log(formData)

    setFormData({
      schoolName: "",
      schoolAddress: "",
      studentName: "",
      studentAddress: "",
      dateOfBirth: "",
      graduationDate: "",
      volunteerHours: "",
      awards: "",
      testName: "",
      testScore: "",
      testDate: "",
      schoolLogo: null
    })
  }






  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Full Name
          </Label>
          <Input id="name" name="name" value={formData.studentName} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address" className="text-right">
            Street Address
          </Label>
          <Input
            id="address"
            name="address"
            value={formData.schoolAddress}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="city" className="text-right">
            City
          </Label>
          <Input id="city" name="city" value={formData.studentAddress} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="state" className="text-right">
            State
          </Label>
          <Input id="state" name="state" value={formData.studentAddress} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="zip" className="text-right">
            ZIP Code
          </Label>
          <Input id="zip" name="zip" value={formData.studentAddress} onChange={handleChange} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="birthdate" className="text-right">
            Birthdate
          </Label>
          <Input
            id="birthdate"
            name="birthdate"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="graduationDate" className="text-right">
            Graduation Date
          </Label>
          <Input
            id="graduationDate"
            name="graduationDate"
            value={formData.graduationDate}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
      </div>
      <CustomDialogFooter>
        <button type="submit" className="bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-2 px-5 rounded text-white cursor-pointer">Save Changes</button>
      </CustomDialogFooter>
    </form>
  )
}
