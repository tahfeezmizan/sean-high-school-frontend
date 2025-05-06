/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from 'next/navigation';
import { Input } from "@/ui/Input";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { setTranscript } from "@/Redux/slice/transcript/transcriptSlice";
import Link from "next/link";
import { Plus } from "lucide-react";
import { setCourseEntries } from "@/Redux/slice/courseEntry/courseEntry";


// this is course entris import 
export type CourseType = {
  id: number
  subjectArea: string
  className: string
  grade: string
  creditEarned: string
}



// This is GradeScale component 

import { setGradeScale } from "@/Redux/slice/gradeScale/gradeScale"
import { Button } from "@/ui/Button"
import { Card, CardContent } from "@/ui/Card"
import { Label } from "@/ui/label"
import { useMediaQuery } from "@/ui/use-mobile"
import { useToast } from "@/ui/use-toast"
import Image from "next/image"
import { useEffect,  } from "react"
import SignatureCanvas from "react-signature-canvas"

type Subject = {
  name: string
  grade: number
}





// This is TranScript component it 
import willowImg from "../../image/willow.png"
import { useReactToPrint } from "react-to-print"
import { Printer, FileDown, Edit2 } from "lucide-react"

// Import custom components 
import { CustomButton } from "@/ui/custom-button"
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from "@/ui/custom-tabs"
import { CustomDialog, CustomDialogContent, CustomDialogHeader, CustomDialogTitle, CustomDialogTrigger } from "@/ui/custom-dialog"
import TranscriptEditForm from "../TranScriptViewer/transcript-edit-form";






// Define types for our transcript data
interface Course {
  name: string
  grade: string
  credits: number
}

interface SubjectGroup {
  title: string
  courses: Course[]
}


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

interface AchievementInfo {
  volunteerHours: number
  achievements: string[]
  testData: string[]
}

type ClassItem = {
  id: number;
  className: string;
  subjectArea: string;
  creditEarned: string 
  grade: string;
};



export function StudentInfoForm() {
  const router = useRouter() 
  const dispatch = useAppDispatch();
  const transcriptForm = useAppSelector((state)=> state.transcript.transcript)
  const courseEntryForm = useAppSelector((state)=> state.courseEntry.courseEntries)
  const gradeScaleForm = useAppSelector((state)=> state.gradeScale.gradeScale)
  console.log('transcript form ', transcriptForm)
  console.log('course entry form ', courseEntryForm)
  console.log('gradeScale form ', gradeScaleForm )

  // studnt info state 
  const [step, setStep] = useState(1)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    // School Info
    schoolName: "",
    schoolAddress: "",
    studentName: "",
    studentAddress: "",
    dateOfBirth: "",
    graduationDate: "",
    volunteerHours: "",
    awards: "",
    // Test Data
    testName: "",
    testScore: "",
    testDate: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.schoolName.trim()) newErrors.schoolName = "School name is required"
    if (!formData.schoolAddress.trim()) newErrors.schoolAddress = "School address is required"
    if (!formData.studentName.trim()) newErrors.studentName = "Student name is required"
    if (!formData.studentAddress.trim()) newErrors.studentAddress = "Student address is required"
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
    if (!formData.graduationDate.trim()) newErrors.graduationDate = "Graduation date is required"
    if (!formData.volunteerHours) newErrors.volunteerHours = "Volunteer hours is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // const validateStep2 = () => {
  //   const newErrors: Record<string, string> = {}

  //   if (!formData.testName) newErrors.testName = "Test name is required"
  //   if (!formData.testScore.trim()) newErrors.testScore = "Test score is required"
  //   if (!formData.testDate) newErrors.testDate = "Test date is required"

  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }





  // this is course entry component functional 
     const [entryType, setEntryType] = useState<"subject" | "grade">("subject")
     const [courses, setCourses] = useState<CourseType[]>([
       {
         id: 1,
         subjectArea: "",
         className: "",
         grade: "",
         creditEarned: '',
       },
     ])
     const courseEntryFOrm  = useAppSelector((state) => state.courseEntry.courseEntries)   
     const addNewCourse = () => {
       const newCourse =
          {
               id: Date.now(),
               subjectArea: "",
               className: "",
               grade: "",
               creditEarned: '',
             }
   
       setCourses([...courses, newCourse])
     }
   


     const updateCourse = (id: number, field: string, value: string | number) => {
       setCourses((prevCourses) =>
         prevCourses.map((course) =>
           course.id === id ? { ...course, [field]: value } : course
         )
       )
     }
   
     


     const handleEntryTypeChange = (type: "subject" | "grade") => {
       setEntryType(type)
       setCourses((prevCourses) =>
         prevCourses.map((course) => {
           if (type === "subject") {
             const { gradeLevel, ...rest } = course as any
             return { ...rest, subjectArea: "" }
           } else {
             const { subjectArea, ...rest } = course as any
             return { ...rest, gradeLevel: "" }
           }
         })
       )
     }
   
   
   


   console.log("course from state", courses)








  //  This is GradeScale components  
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [signature, setSignature] = useState<string | null>(null)
  const [dates, setDate] = useState('') 
  const gradScale = useAppSelector((state) => state.courseEntry.courseEntries)

  // console.log('update course entry in redux', gradScale)
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: "Mathematics", grade: 92 },
    { name: "Science", grade: 88 },
  ])
  const [totalEarned, setTotalEarned] = useState(22)
  const [gpas, setGpa] = useState(3.86)
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
    }
  }








// This is Transcript component download PDF Print and Edit 
const printRef = useRef<HTMLDivElement>(null)

  const studentInfo = useAppSelector((state) => state.transcript.transcript)
  const courseEntryFormData = useAppSelector((state) => state.courseEntry.courseEntries)
  // const gradeScaleForm = useAppSelector((state) => state.gradeScale.gradeScale)
  // console.log('studentInfo', studentInfo)
  console.log('course entrys', courseEntryFormData)
  // console.log('grade scale', gradeScaleForm)

  const groupedData: Record<string, ClassItem[]> = courseEntryFormData.reduce((acc, item) => {
    if (!acc[item.className]) {
      acc[item.className] = [];
    }
    acc[item.className].push(item);
    return acc;
  }, {} as Record<string, ClassItem[]>);

  console.log(groupedData)




  // State for student information
  const [studentInfoState, setStudentInfo] = useState<StudentInfo>({
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



  // State for academic records
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>([
    {
      title: "LANGUAGE ARTS",
      courses: [
        { name: "English 9", grade: "A", credits: 1 },
        { name: "English 10", grade: "B", credits: 1 },
        { name: "English 11", grade: "A", credits: 1 },
        { name: "English 12", grade: "A", credits: 1 },
        { name: "Public Speaking", grade: "A", credits: 0.5 },
      ],
    },
    {
      title: "FOREIGN LANGUAGE",
      courses: [{ name: "Spanish I", grade: "A", credits: 1 }],
    },
    {
      title: "SCIENCE",
      courses: [
        { name: "Biology I", grade: "A", credits: 1 },
        { name: "Chemistry I", grade: "A", credits: 1 },
        { name: "Anatomy and Health", grade: "A", credits: 1 },
      ],
    },
    {
      title: "SOCIAL STUDIES",
      courses: [
        { name: "World History and Geography", grade: "B", credits: 1 },
        { name: "American History", grade: "A", credits: 1 },
        { name: "American Government", grade: "A", credits: 0.5 },
        { name: "Economics", grade: "A", credits: 0.5 },
        { name: "Ancient History", grade: "B", credits: 1 },
      ],
    },
    {
      title: "ELECTIVES",
      courses: [
        { name: "Computer Applications and Business Tech", grade: "A", credits: 1 },
        { name: "Operating Systems: Windows and Linux", grade: "A", credits: 1 },
        { name: "Health and Wellness", grade: "A", credits: 0.5 },
        { name: "Advanced Computer Security", grade: "A", credits: 1 },
        { name: "Physical Education I", grade: "A", credits: 1 },
        { name: "Computer Programming and Scripting", grade: "A", credits: 1 },
      ],
    },
  ])



  // State for achievements and additional info
  const [achievementInfo, setAchievementInfo] = useState<AchievementInfo>({
    volunteerHours: 151,
    achievements: [
      "GIAC Foundational Cybersecurity Technologies Certified (GFACT)",
      "National Cyber Scholarship Competition",
    ],
    testData: ["ACT Composite Score - 33 - April 2021"],
  })




  // Calculate total credits and GPA
  const calculateTotals = () => {
    let totalCredits = 0
    let totalGradePoints = 0

    subjectGroups.forEach((group) => {
      group.courses.forEach((course) => {
        totalCredits += course.credits

        // Calculate grade points
        let gradePoints = 0
        switch (course.grade) {
          case "A":
            gradePoints = 4.0
            break
          case "B":
            gradePoints = 3.0
            break
          case "C":
            gradePoints = 2.0
            break
          case "D":
            gradePoints = 1.0
            break
          default:
            gradePoints = 0
        }

        totalGradePoints += gradePoints * course.credits
      })
    })

    const gpa = totalGradePoints / totalCredits

    return {
      totalCredits: totalCredits.toFixed(1),
      gpa: gpa.toFixed(2),
    }
  }

  const { totalCredits, gpa } = calculateTotals()




  
  // Handle printing functionality
  // const handlePrint = useReactToPrint({
    
    
  // content: () =>  printRef.current,
  //   documentTitle: `Transcript_${studentInfo.name.replace(/\s+/g, "_")}`,
  // removeAfterPrint: true, // Optional: removes the iframe after printing
  //   onAfterPrint: () => console.log("Printed successfully!")



  //   onAfterPrint: () => {
  //     // addToast({
  //     //   title: "Print successful",
  //     //   description: "Your transcript has been sent to the printer.",
  //     // })
  //   },
  // })




  // Handle PDF download (in a real app, this would generate a PDF)
  const handleDownloadPDF = () => {
    // addToast({
    //   title: "PDF Downloaded",
    //   description: "Your transcript has been downloaded as a PDF.",
    // })

    // it will be show review modal after PDF download 
    router.push('/review')
    
  }




  // Handle edit submission
  const handleEditSubmit = (updatedInfo: StudentInfo) => {
    setStudentInfo(updatedInfo)

    // addToast({
    //   title: "Information Updated",
    //   description: "Student information has been updated successfully.",
    // })
  }




















  const handleNext = (e: FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      if (validateStep1()) {
        setStep(2)
      }
    } else if (step === 2) {
      // if (validateStep2()) {

        const completeFormData = {
          ...formData,
          schoolLogo: logoFile,
        };
        // Submit the form
        console.log("Form submitted:", {
         completeFormData
        })
        dispatch(setTranscript(completeFormData))
        setStep(3)

    }else if (step == 3) {


      if(entryType === "subject"){
        // console.log('course subject', courses)
        dispatch(setCourseEntries(courses))
        setStep(4)
        // router.push("/gradeScale")
      }


    }else if (step == 4) {
      // submit data for gradeScale component 
      dispatch(setGradeScale({name, title, signature, dates})) 
      // console.log( 'course data',  courses)
      setStep(5)
    }

  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }
  const openFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const testOptions = [
    "SAT",
    "ACT",
    "AP Biology",
    "AP Chemistry",
    "AP Physics",
    "AP Calculus",
    "AP English",
    "AP History",
  ]

 




  return (
    <div className="space-y-6">
      {/* Progress bar */}


      {step === 1 && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div>
            <h1 className="text-[48px] font-semibold mb-8 text-[#333]">School & Student Info</h1>
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="schoolName" className="block text-[18px] font-medium text-[#333333]">
                School Name
              </label>
              <Input
                id="schoolName"
                name="schoolName"
                type="text"
                value={formData.schoolName}
                onChange={handleChange}
                placeholder="Enter your school name"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.schoolName ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              />
              {errors.schoolName && <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="schoolAddress" className="block text-[18px] font-medium text-[#333333]">
                School Address
              </label>
              <input
                id="schoolAddress"
                name="schoolAddress"
                type="text"
                value={formData.schoolAddress}
                onChange={handleChange}
                placeholder="Enter your school address"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.schoolAddress ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              />
              {errors.schoolAddress && <p className="text-red-500 text-sm mt-1">{errors.schoolAddress}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="logo" className="block text-[18px] font-medium text-[#333333]">
                Upload Logo
              </label>
              <div
                className="border border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={openFileUpload}
              >
                {logoPreview ? (
                  <div className="relative w-full h-32 flex items-center justify-center">
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="School logo preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-sm text-gray-500">Click to upload</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="studentName" className="block text-[18px] font-medium text-[#333333]">
                Student Full Name
              </label>
              <input
                id="studentName"
                name="studentName"
                type="text"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.studentName ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              />
              {errors.studentName && <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="studentAddress" className="block text-[18px] font-medium text-[#333333]">
                Student Address
              </label>
              <input
                id="studentAddress"
                name="studentAddress"
                type="text"
                value={formData.studentAddress}
                onChange={handleChange}
                placeholder="Enter your address"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.studentAddress ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              />
              {errors.studentAddress && <p className="text-red-500 text-sm mt-1">{errors.studentAddress}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="block text-[18px] font-medium text-[#333333]">
                Date of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="graduationDate" className="block text-[18px] font-medium text-[#333333]">
                Graduation Date
              </label>
              <input
                id="graduationDate"
                name="graduationDate"
                type="date"
                value={formData.graduationDate}
                onChange={handleChange}
                placeholder="Enter your graduation date"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.graduationDate ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              />
              {errors.graduationDate && <p className="text-red-500 text-sm mt-1">{errors.graduationDate}</p>}
            </div>




            <div className="space-y-2">
              <label htmlFor="volunteerHours" className="block text-[18px] font-medium text-[#333333]">
              volunteerHours
              </label>
              <input  
                id="volunteerHours"
                name="volunteerHours"
                type="text"
                value={formData.volunteerHours}
                onChange={handleChange}
                placeholder="Enter your graduation date"
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.volunteerHours ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              />
              {errors.volunteerHours && <p className="text-red-500 text-sm mt-1">{errors.volunteerHours}</p>}
            </div>



            {/* <div className="space-y-2">
              <label htmlFor="volunteerHours" className="block text-[18px] font-medium text-[#333333]">
                Volunteer Hours
              </label>

              <select
                id="volunteerHours"
                name="volunteerHours"
                value={formData.volunteerHours}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.volunteerHours ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              >
                <option value="" disabled>
                  Enter your volunteer hours
                </option>
                {volunteerHourOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.volunteerHours && <p className="text-red-500 text-sm mt-1">{errors.volunteerHours}</p>}
            </div> */}


            <div className="space-y-2">
              <label htmlFor="awards" className="block text-[18px] font-medium text-[#333333]">
                Awards & Achievements
              </label>
              <textarea
                id="awards"
                name="awards"
                value={formData.awards}
                onChange={handleChange}
                placeholder="Enter your award & achievement"
                rows={3}
                className="w-full px-3 py-2 border border-gray-200  rounded-md focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={step === 1}
                className="px-4 py-2 border border-gray-300 rounded-full text-black bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
              >
                <Link href='/' >
                    Previous
                </Link>
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 text-white rounded-full"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div>
            <h1 className="text-[48px] font-semibold mb-8 text-[#333]">Standardized Tests </h1>
          </div>


          <form onSubmit={handleNext} className="space-y-6">
            <div className="space-y-2">
              <label  htmlFor="testName" className="block text-[18px] font-medium text-[#333333]">
                Test Name <span className="!text-[15px]">(Optional)</span>
              </label>
              <select
                id="testName"
                name="testName"
                value={formData.testName}
                onChange={handleChange}
                className={`w-full px-3 py-3 border rounded-md ${
                  errors.testName ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              >
                <option value="" disabled>
                  Test name
                </option>
                {testOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.testName && <p className="text-red-500 text-sm mt-1">{errors.testName}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="testScore" className="block text-[18px] font-medium text-[#333333]">
                Test Score <span className="!text-[15px]">(Optional)</span>
              </label>
              <input
                id="testScore"
                name="testScore"
                type="text"
                value={formData.testScore}
                onChange={handleChange}
                placeholder="Score"
                className={`w-full px-3 py-3 border rounded-md ${
                  errors.testScore ? "border-red-500" : "border-gray-300"
                } focus:outline-none `}
              />
              {errors.testScore && <p className="text-red-500 text-sm mt-1">{errors.testScore}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="testDate" className="block text-[18px] font-medium text-[#333333]">
                Test Date <span className="!text-[15px]">(Optional)</span>
              </label>
              <input
                id="testDate"
                name="testDate"
                type="date"
                value={formData.testDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.testDate ? "border-red-500" : "border-gray-300"
                } focus:outline-none`}
              />
              {errors.testDate && <p className="text-red-500 text-sm mt-1">{errors.testDate}</p>}
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none "
              >
                
                Previous
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 text-white rounded-full"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      )}


      {/* course entry component  */}

       {
        step === 3 && ( 
          <div className="px-4 py-8 max-w-4xl mx-auto">
          <div className="space-y-8">
    
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-800 mt-2">
                Course Entry
              </h1>
            </div>
    
    
            {/* Radio Buttons */}
            <div className="flex flex-wrap gap-4">
              <label
                className="flex items-center gap-2 cursor-pointer border-2 border-gray-300 p-4 hover:border-blue-200 transition-all duration-200 rounded-lg"
                style={{
                  borderColor: entryType === "subject" ? "#3b82f6" : "",
                }}
              >
                <input
                  type="radio"
                  name="entryType"
                  value="subject"
                  checked={entryType === "subject"}
                  onChange={() => handleEntryTypeChange("subject")}
                />
                By Subject Area
              </label>
    
              {/* <label
                className="flex items-center gap-2 cursor-pointer border-2 border-gray-300 p-4 hover:border-blue-200 transition-all duration-200 rounded-lg"
                style={{
                  borderColor: entryType === "grade" ? "#3b82f6" : "",
                }}
              >
                <input
                  type="radio"
                  name="entryType"
                  value="grade"
                  checked={entryType === "grade"}
                  onChange={() => handleEntryTypeChange("grade")}
                />
                By Grade Level
              </label> */}
    
    
            </div>
    
            {/* Course Inputs */}
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4 font-medium text-[#333333] text-[17px] border-b border-gray-300 pb-2">
                <div>
                  {entryType === "subject" ? "Subject Area" : "Grade Level"}
                </div>
                <div>Class name</div>
                <div>Grade</div>
                <div>Credit Earned</div>
              </div>
    
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="grid grid-cols-4 gap-4 items-center"
                >
    
    
    
                  {/* Subject Area or Grade Level */}
                  {/* {entryType === "subject" ? (
                    <input 
                      type="text"
                      className="border rounded p-3 focus:outline-none border-gray-300"
                      value={(course.subjectArea as any).subjectArea}
                      placeholder="Subject"
                      onChange={(e) =>
                        updateCourse(course.id, "subjectArea", e.target.value)
                      }
                    >
                      
                    </input>
                  ) : (
                    <input
                      className="border rounded p-3 focus:outline-none border-gray-300"
                      type="text"
                      placeholder="e.g. 09"
                      value={(course as any).gradeLevel}
                      onChange={(e) =>
                        updateCourse(course.id, "gradeLevel", e.target.value)
                      }
                    />
                  )} */}

                    <input 
                      type="text"
                      className="border rounded p-3 focus:outline-none border-gray-300"
                      value={(course.subjectArea)}
                      placeholder="Subject"
                      onChange={(e) =>
                        updateCourse(course.id, "subjectArea", e.target.value)
                      }
                    >
                    </input>
    
    
    
                  {/* Class Name */}
                  <input
                    className="border rounded p-3 focus:outline-none border-gray-300"
                    type="text"
                    placeholder="Class name"
                    value={course.className }
                    onChange={(e) =>
                      updateCourse(course.id, "className", e.target.value)
                    }
                  />
    
                  {/* Grade */}
                  <select
                    className="border rounded p-3 focus:outline-none border-gray-300"
                    value={course.grade}
                    onChange={(e) =>
                      updateCourse(course.id, "grade", e.target.value)
                    }
                  >
                    <option value="">Select grade</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                  </select>
    
                  {/* Credit Earned */}
                  <input
                    className="border rounded p-3 focus:outline-none border-gray-300"
                    type="number"
                    placeholder="e.g. 1.0"
                    value={course.creditEarned}
                    onChange={(e) =>
                      updateCourse(course.id, "creditEarned", e.target.value)
                    }
                  />
                </div>
              ))}
    
    
    
              {/* Add New Course Button */}
              <button
                className="flex items-center gap-3 focus:outline-none border-gray-300 text-[#5C5C5C] border py-3 px-5 rounded-lg"
                onClick={addNewCourse}
              >
                <Plus className="h-4 w-4" />
                Add New Course
              </button>
            </div>
    
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button onClick={handlePrevious}  className="px-4 py-2 border border-gray-300 rounded-full">
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-gradient-to-b from-[#B8DBFC] to-[#2A89E2] hover:from-blue-500 hover:to-blue-700 text-white rounded-full"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        )
       }



      {/* show GradeScale component  */}
      {
        step === 4 && (
          <div className="space-y-6 max-w-4xl mx-auto">

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
              Previous
            </Button>
            <Button className="bg-gradient-to-b from-[#B8DBFC] to-[#2A89E2] hover:from-blue-500 hover:to-blue-700 rounded-full text-white " onClick={handleNext}>
              Preview Transcript
            </Button>
          </div>
        </div>
        )
      }



      {/* show transcript component for manage download PDF, Print and Edit  */}
      {
        step === 5 && (
       <div className="custom-container py-6 px-4 md:px-6 ">


      <div className="w-full ">


        <div className="p-0">
          <CustomTabs defaultValue="view" className="w-full">
            

            <CustomTabsContent value="view" className="p-0">
              <div  ref={printRef} className="p-6">
                {/* Header with logo and school name */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-40 items-center mb-4 md:mb-0">
                    <div className="lg:w-[150px] lg:h-[100px] w-20 h-20 relative mr-3">
                      <Image
                        src={willowImg}
                        alt="Willow Hill Academy Logo"
                        width={500}
                        height={200}
                        className="object-contain"
                      />
                    </div>

                    <div className="">
                      <h1 className="!text-[35px] md:text-2xl font-medium text-gray-700">Willow Hill Academy</h1>
                    </div>

                  </div>
                </div>




                {/* Transcript Title */}
                <div className="bg-gray-100 py-5 text-center mb-6 mt-20 border-t-8 border-gray-600">
                  <h2 className="text-[20px] text-gray-500 font-medium uppercase">High School Transcript</h2>
                </div>

                {/* Student Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 border-b-8 border-gray-600 pb-4">


                  <div className="w-2/3">

                   <div className="grid grid-cols-2 space-y-4">
                   <span  className="font-medium text-[18px] text-gray-900">Name:</span>
                   <p className="text-"> {studentInfo.studentName} </p>
                   </div>


                   <div className="grid grid-cols-2 space-y-4">
                   <span  className="font-medium text-[18px] text-gray-900">Address:</span>
                    <p> {studentInfo.studentAddress}
                      <br />
                      {/* {studentInfo.city}, {studentInfo.state} {studentInfo.zip} */}
                    </p>
                   </div>


                  </div>


                  <div className="w-2/3">
                   <div className="grid grid-cols-2 space-y-4">
                   <span  className="font-medium text-[18px] text-gray-900">Birthdate:</span>
                   <p className="text-"> {studentInfo.dateOfBirth} </p>
                   </div>


                   <div className="grid grid-cols-2 space-y-4">
                   <span  className="font-medium text-[18px] text-gray-900">Graduation Date:</span>
                    <p> {studentInfo.graduationDate}
                    </p>
                   </div>

                  </div>
                </div>







                {/* Academic Records */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-20 mb-6">




                  {/* Left Column */}
                 

                    {/* {subjectGroups.slice(0, Math.ceil(subjectGroups.length / 2)).map((group, index) => (
                      <div key={index} className="mb-6">
                        <div className="bg-[#E9E9E9] py-3 px-2 mb-2">
                          <h3 className="font-semibold">{group.title} :</h3>
                        </div>
                        <table className="w-full">
                          <thead>
                            <tr className="text-sm text-gray-600">
                              <th className="text-left py-1">Subject</th>
                              <th className="text-center py-1 w-20">Grade</th>
                              <th className="text-center py-1 w-24">Credits Earned</th>
                            </tr>
                          </thead>
                          <tbody>
                            {courseEntryForm.map((course, courseIndex) => (
                              <tr key={courseIndex}>
                                <td className="py-4">{course.creditEarned}</td>
                                <td className="text-center py-1 my-3">{course.grade}</td>
                                <td className="text-center py-1 my-3">{course.creditEarned}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))} */}


                { Object.entries(groupedData).slice(0, Math.ceil(subjectGroups.length / 2)).map(([ className, items], index) => (
                      <div key={index} className="mb-6">
                        <div className="bg-[#E9E9E9] py-3 px-2 mb-2">
                          <h3 className="font-semibold">{className} :</h3>
                        </div>
                        <table className="w-full">
                          <thead>
                            <tr className="text-sm text-gray-600">
                              <th className="text-left py-1">Subject</th>
                              <th className="text-center py-1 w-20">Grade</th>
                              <th className="text-center py-1 w-24">Credits Earned</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((course, courseIndex) => (
                              <tr key={courseIndex}>
                                <td className="py-4">{course.subjectArea}</td>
                                <td className="text-center py-1 my-3">{course.grade}</td>
                                <td className="text-center py-1 my-3">{course.creditEarned}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                </div>









                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:gap-8 lg:gap-20">
                  {/* Left Column - Achievements */}
                  <div className="border py-4">
                    <p className="font-semibold mb-2 border-b px-4">Volunteer Hours: {achievementInfo.volunteerHours}</p>
                    <div className="mb-4 px-4">
                      <p className="font-semibold mb-1">Leadership Positions, Achievements, and Awards:</p>
                      <ul className="list-disc pl-5">
                        {achievementInfo.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column - Grade Scale and Totals */}
                  <div>
                    <div className=" border-t-1  mb-10 border-b-1 border-r-1 border-l-1">
                      <div className="grid grid-cols-2 ">
                        <div className="border-r-1 p-4">
                          <p className="font-semibold mb-1">Grade scale</p>
                          <p>A = 90-100</p>
                          <p>B = 80-89</p>
                          <p>C = 70-79</p>
                          <p>D = 60-69</p>
                        </div>
                        <div className="">
                          <p className="p-4">
                            <span className="font-semibold ">Total Earned:</span> {totalCredits}
                          </p>
                          <p className="border-b-1">
                            <span className="font-semibold p-4">GPA:</span> {gpa}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border p-4">
                      <p className="font-semibold mb-1">Test Data:</p>
                      {achievementInfo.testData.map((test, index) => (
                        <p key={index}>{test}</p>
                      ))}
                    </div>
                  </div>
                </div>




                {/* Signature Section */}
                <div className="mt-8 pt-4 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-2">Official signature:</p>
                      <div className="border-b border-black w-64 h-12 flex items-end justify-center pb-1">
                        <p className="italic">Sean M. Houle</p>
                      </div>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">Date:</span> 12/12/2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CustomTabsContent>

            <CustomTabsContent value="info" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Student Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p>
                        <span className="font-semibold">Name:</span> {studentInfo.schoolName}
                      </p>
                      <p>
                        <span className="font-semibold">Birthdate:</span> {studentInfo.dateOfBirth}
                      </p>
                      <p>
                        <span className="font-semibold">Graduation Date:</span> {studentInfo.graduationDate}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold">Address:</span>
                      </p>
                      <p>{studentInfo.schoolAddress}</p>
                      <p>
                        {/* {studentInfo.city}, {studentInfo.state} {studentInfo.zip} */}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Academic Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p>
                        <span className="font-semibold">Total Credits Earned:</span> {totalCredits}
                      </p>
                      <p>
                        <span className="font-semibold">GPA:</span> {gpa}
                      </p>
                      <p>
                        <span className="font-semibold">Volunteer Hours:</span> {achievementInfo.volunteerHours}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Test Scores:</p>
                      <ul className="list-disc pl-5">
                        {achievementInfo.testData.map((test, index) => (
                          <li key={index}>{test}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Achievements & Awards</h3>
                  <ul className="list-disc pl-5">
                    {achievementInfo.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CustomTabsContent>

            <div className="flex justify-end items-center  p-4">
              {/* <CustomTabsList>
                <CustomTabsTrigger value="view">View Transcript</CustomTabsTrigger>
                <CustomTabsTrigger value="info">Student Info</CustomTabsTrigger>
              </CustomTabsList> */}

              <div className="flex space-x-2">
                <CustomDialog>
                  <CustomDialogTrigger asChild>
                    <CustomButton variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </CustomButton>
                  </CustomDialogTrigger>
                  <CustomDialogContent>
                    <CustomDialogHeader>
                      <CustomDialogTitle>Edit Student Information</CustomDialogTitle>
                    </CustomDialogHeader>
                    <TranscriptEditForm studentInfo={studentInfo} onSubmit={handleEditSubmit} />
                  </CustomDialogContent>
                </CustomDialog>


                <CustomButton variant="outline" size="sm" onClick={handleDownloadPDF}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Download PDF
                </CustomButton>


                <CustomButton variant="outline" size="sm"
                  // onClick={handlePrint}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </CustomButton>
              </div>
            </div>
          </CustomTabs>
        </div>
      </div>


      <Button variant="outline" className="rounded-full border border-gray-200 " onClick={handlePrevious}> 
              Previous
            </Button>
    </div>
        )
      }
    </div>
  )
}
