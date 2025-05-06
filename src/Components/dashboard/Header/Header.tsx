
"use client"
import Image from "next/image"
import man from '../../../image/man.jpg'
import { useAppSelector } from "@/Redux/hook"

const Header = () => {

  const user = useAppSelector((state) => state.auth.user)
  
    return (
      <header className="bg-[#fff] text-black h-20 flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm py-10" >
        
     
      <div className="flex flex-col space-y-1">
        <div   className="flex items-center gap-4">
          <span className="text-sm md:text-[24px] font-medium">Welcome Back Dashboard</span>
        </div>
        {/* <div className="text-sm opacity-80">Today Transcripts</div> */}
      </div>



      <div className="flex items-center gap-5">
        <Image src={user?.profilePicture || man} width={500} height={500} alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
        <div className="flex flex-col"> 
        <span className="text-[17px] font-medium">Welcome Admin</span>
            <div className="text-sm opacity-80">{ user?.name}</div>
      </div>


      </div>
    </header>
    )
  }
  
  export default Header;