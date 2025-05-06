/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import willowImg from "../../image/willow.png"
import { useReactToPrint } from "react-to-print"
import { Printer, FileDown, Edit2 } from "lucide-react"

// Import custom components 
import { CustomButton } from "@/ui/custom-button"
import { Card, CardContent } from "@/ui/Card"
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from "@/ui/custom-tabs"
import { CustomDialog, CustomDialogContent, CustomDialogHeader, CustomDialogTitle, CustomDialogTrigger } from "@/ui/custom-dialog"
import TranscriptEditForm from "./transcript-edit-form"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/Redux/hook"





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



// groud course entry data type 
type ClassItem = {
  id: number;
  className: string;
  subjectArea: string;
  creditEarned: string 
  grade: string;
};




export default function TranscriptViewer() {



  
  const router = useRouter()
  const printRef = useRef<HTMLDivElement>(null)

  const studentInfo = useAppSelector((state) => state.transcript.transcript)
  const courseEntryForm = useAppSelector((state) => state.courseEntry.courseEntries)
  // const gradeScaleForm = useAppSelector((state) => state.gradeScale.gradeScale)
  
  // console.log('studentInfo', studentInfo)
  console.log('course entrys', courseEntryForm)
  // console.log('grade scale', gradeScaleForm)





  const groupedData: Record<string, ClassItem[]> = courseEntryForm.reduce((acc, item) => {
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










  return (
    <div className="custom-container py-6 px-4 md:px-6">


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


      
    </div>
  )
}
