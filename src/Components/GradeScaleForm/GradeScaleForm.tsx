/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useAppDispatch, useAppSelector } from "@/Redux/hook"
import { setGradeScale } from "@/Redux/slice/gradeScale/gradeScale"
import { Button } from "@/ui/Button"
import { Card, CardContent } from "@/ui/Card"
import { Input } from "@/ui/Input"
import { Label } from "@/ui/label"
import { useMediaQuery } from "@/ui/use-mobile"
import { useToast } from "@/ui/use-toast"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import SignatureCanvas from "react-signature-canvas"


type Subject = {
  name: string
  grade: number
}


export default function GradeScaleForm() {
  const router = useRouter()  
  const [step, setStep] = useState(4)
  const [name, setName] = useState("Sean M. Houle")
  const [title, setTitle] = useState("")
  const [signature, setSignature] = useState<string | null>(null)
  const [dates, setDate] = useState('') 

  const  dispatch = useAppDispatch()
  const gradScale = useAppSelector((state) => state.courseEntry.courseEntries)


  // console.log('update course entry in redux', gradScale)


  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "Mathematics", grade: 92 },
    { name: "Science", grade: 88 },
  ])



  const [totalEarned, setTotalEarned] = useState(22)
  const [gpa, setGpa] = useState(3.86)
  const { toast } = useToast()
  const isMobile = useMediaQuery("(max-width: 640px)")

  const sigCanvasRef = useRef<SignatureCanvas | null>(null)



  const calculateGPA = (grades: number[]): number => {
    if (grades.length === 0) return 0

    const points: number[] = grades.map((grade) => {
      if (grade >= 90) return 4.0
      if (grade >= 80) return 3.0
      if (grade >= 70) return 2.0
      if (grade >= 60) return 1.0
      return 0
    })


    const sum = points.reduce((acc, point) => acc + point, 0)
    return Number.parseFloat((sum / points.length).toFixed(2))
  }




  useEffect(() => {
    // Calculate GPA whenever subjects change
    const grades = subjects.map((subject) => subject.grade)
    setGpa(calculateGPA(grades))
  }, [subjects])



  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
      toast({
        title: "Previous Step",
        description: `Moved to step ${step - 1}`,
      })
    }
  }


  const handlePreview = () => {  
  // In a real app, this would generate a preview or PDF
  // console.log({name, title, signature, dates})
  dispatch(setGradeScale({name, title, signature, dates}))
  router.push('/transcript')
  }


  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear()
      setSignature(null)
    }
  }

  const saveSignature = () => {
    if (sigCanvasRef.current) {
      const dataURL = sigCanvasRef.current.toDataURL("image/png")
      setSignature(dataURL)
      toast({
        title: "Signature Saved",
        description: "Your signature has been recorded",
      })
    }
  }




  return (
    <div className="space-y-6">

      <h1 className="text-4xl font-bold text-gray-800">Grade Scale</h1>


      <div className="mt-6">
        <h2 className="text-xl text-gray-600 mb-2">Subject Area</h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 rounded-md">
          <div className="p-4 border-r border-gray-300">
            <h3 className="font-medium mb-4">Grade scale</h3>
            <div className="space-y-2">
              <p>A = 90-100</p>
              <p>B = 80-89</p>
              <p>C = 70-79</p>
              <p>D = 60-69</p>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between mb-4">
              <span>Total Earned:</span>
              <span className="font-medium">{totalEarned}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span>GPA :</span>
              <span className="font-medium">{gpa}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <div>
          <Label htmlFor="name" className="block text-[18px] font-medium text-[#333333]">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="signature" className="block text-[18px] font-medium text-[#333333]">Signing Official</Label>
          <Card className="mt-1 border border-dashed">
            <CardContent className="p-0">
              {signature ? (
                <div className="p-4">
                  <Image width={500} height={500} src={signature || "/placeholder.svg"} alt="Signature" className="max-h-24 mx-auto" />
                  <Button variant="outline" size="sm" onClick={clearSignature} className="mt-2">
                    Clear
                  </Button>
                </div>
              ) : (
                <div className="p-2">
                  <SignatureCanvas
                    ref={sigCanvasRef}
                    penColor="black"
                    canvasProps={{
                      className: "signature-canvas w-full h-24 border border-gray-200",
                    }}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" onClick={clearSignature}>
                      Clear
                    </Button>
                    <Button size="sm" onClick={saveSignature}>
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>




        <div>
          <Label htmlFor="title" className="block text-[18px] font-medium text-[#333333]">Title (Optional)</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="mt-1"
          />
        </div>


        <div>
          <Label htmlFor="title" className="block text-[18px] font-medium text-[#333333]">Today Date</Label>
          <Input
            type="date"
            id="title"
            value={dates}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Title"
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" className="rounded-full border border-gray-200 " onClick={handlePrevious}>
          <Link href='/courseEntry'> 
          Previous
          </Link>
        </Button>
        <Button className="bg-gradient-to-b from-[#B8DBFC] to-[#2A89E2] hover:from-blue-500 hover:to-blue-700 rounded-full text-white " onClick={handlePreview}>
          Preview Transcript
        </Button>
      </div>
    </div>
  )
}
