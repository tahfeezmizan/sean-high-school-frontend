import { CheckCircle, Phone } from "lucide-react"
import Image from "next/image"
import academicJourneyImg from '../../../image/academic-journey.png'



export default function AcademicJourney() {



  return (
    <section className=" bg-white">
      <div className="custom-container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

          {/* Images Section - Stacked on mobile, side by side on larger screens */}
          <div className=" lg:col-span-6 relative">
               <Image src={academicJourneyImg} width={500} height={500} alt="logo" className="w-full " />

               <div className=" bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] w-[25%] h-[38.5%]  absolute top-0 right-0 rounded flex flex-col justify-center ">
                  <p className="text-[48px] font-bold text-[#FFFFFF] text-center ">25+</p>
                  <p className="text-[18px] flex justify-center text-[#FFFFFF] ">Years of Experience</p>
               </div>
          </div>
         







          {/* Content Section */}
          <div className="lg:col-span-6 flex flex-col md:flex-row  items-center">
          

            {/* Main Content */}
            <div className="flex-1">
              <div className="inline-block text-gray-700 text-[14px] bg-linear-to-t from-[#DAEBFA] to-[#DAEBFA]  px-4 py-3 rounded-full text-sm mb-4">
                  Leading the Way in Transcript Services
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#333333] mb-4 mt-1">
                Empowering Your Academic Journey
              </h1>

              <p className="text-[#5C5C5C] text-[18px] mb-6 mt-6">
                We assist students, parents, and educational institutions in obtaining official high school transcripts
                with ease. Our streamlined process guarantees quick access to verified transcripts. Simply fill out the
                form, complete payment, and download your transcript in minutes. Fast, secure, and hassle-free service
                to meet your needs.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-[#2A89E2] mr-2 h-6 w-6 mt-0.5 shrink-0" />
                  <span className="text-[#2A89E2] text-[18px] font-[500]">Quick and Easy Transcript Ordering</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-[#2A89E2] mr-2 h-6 w-6 mt-0.5 shrink-0" />
                  <span className="text-[#2A89E2] text-[18px] font-[500]">Secure Payment Processing</span>
                </div>
              </div>

              <div className="flex items-center  rounded-lg">
                <div className="bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-70% p-6 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600">Have any Questions?</p>
                  <p className="text-[#2A89E2] font-bold text-lg">+ 1-555-678-8888</p>
                </div>
              </div>

              <div className="mt-6 md:hidden">
                <button className="w-full bg-blue-500 hover:bg-blue-600">Order Transcript Now</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  )
}
