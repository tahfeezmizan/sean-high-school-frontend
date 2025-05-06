/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/Redux/hook"
import { setCourseEntries } from "@/Redux/slice/courseEntry/courseEntry"
import Link from "next/link"




export type CourseType = {
      id: number
      subjectArea: string
      className: string
      grade: string
      creditEarned: string
    }
  



export default function CourseEntryPage() {
  const router = useRouter()
  const [entryType, setEntryType] = useState<"subject" | "grade">("subject")
  const [courses, setCourses] = useState<CourseType[]>([
    {
      id: 1,
      subjectArea: "",
      className: "Algebra I",
      grade: "A",
      creditEarned: '',
    },
  ])


  const courseEntryFOrm  = useAppSelector((state) => state.courseEntry.courseEntries)
  console.log('course entry file', courseEntryFOrm)


  console.log('subject', courseEntryFOrm)




  const dispatch = useAppDispatch()



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




  const handleNext = () => {
    console.log(courses)
    // router.push("/gradeScale")

    if(entryType === "subject"){
      console.log('subject', courses)
      
      dispatch(setCourseEntries(courses))
      router.push("/gradeScale")
    }

    if(entryType === 'grade'){
      console.log('grade', courses)
    }
    
  }





  return (
    <div className="px-4 py-8 max-w-4xl">
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
                  value={(course as any).subjectArea}
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
          <button className="px-4 py-2 border border-gray-300 rounded-full">
            <Link href='/createTranscript' > 
            Previous
            </Link>
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
