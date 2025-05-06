"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOutIcon, Menu, UserRoundCheck, X } from "lucide-react"
import logo from "../../../image/Logo.svg"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/Redux/hook"
import { logout } from "@/Redux/slice/auth/authSlice"
import Cookies from "js-cookie"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avater"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuShortcut } from "@/ui/Dropdrown"
import { useLogoutMutation } from "@/Redux/apis/auth/authApi"


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const isHomePage = pathname === "/"
  const router = useRouter()
  const [logOut] = useLogoutMutation()

  const handleLogout = async() => {
    dispatch(logout())
    await logOut({}).unwrap
    await Cookies.remove('refreshToken')
    Cookies.remove('token')
    router.push("/");
  }

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/createTranscript", text: "Create Your Transcript" },
    { href: "/pricing", text: "Pricing" },
    { href: "/faqAccordion", text: "FAQ" },
  ]

  const adminLinks = [
    { href: "/dashboard", text: "Dashboard", icon: <UserRoundCheck size={16} /> },
    { href: "/profile", text: "Profile", icon: <UserRoundCheck size={16} /> },
  ]

  const userLinks = [
    { href: "/profile", text: "Profile", icon: <UserRoundCheck size={16} /> },
  ]

  return (
    <header className={`w-full shadow-sm ${isHomePage ? 'fixed top-0 left-0 z-10 bg-[#00000066]' : 'bg-black'}`}>
      <div className="custom-container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex gap-12 items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src={logo}
                width={100}
                height={100}
                alt="Company Logo"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-white text-lg hover:text-blue-500 px-1 py-2 font-medium border-b-2 border-transparent hover:border-blue-500 transition-colors ${pathname === link.href ? 'text-blue-400 border-blue-500' : ''
                    }`}
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-white">
                    <Avatar>
                      <AvatarImage
                        src={user?.profilePicture || "https://github.com/shadcn.png"}
                        alt={user?.name || "User avatar"}
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md" align="end">
                  {(user.role === "SUPER_ADMIN" || user.role === "ADMIN" ? adminLinks : userLinks).map((link) => (
                    <Link href={link.href} passHref key={link.href}>
                      <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 text-lg">
                        {link.text}
                        <DropdownMenuShortcut>{link.icon}</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  ))}
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100 text-lg text-red-500"
                    onClick={handleLogout}
                  >
                    Log Out
                    <DropdownMenuShortcut><LogOutIcon size={16} /></DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/signin"
                className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-b from-[#B8DBFC] to-[#2A89E2] rounded-full hover:from-blue-500 hover:to-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Log in"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-900 transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-500 hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.text}
            </Link>
          ))}

          {user && (
            <>
              {(user.role === "SUPER_ADMIN" || user.role === "ADMIN" ? adminLinks : userLinks).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-500 hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
            </>
          )}

          <div className="px-3 pt-2">
            {user ? (
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="w-full text-center px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Log Out
              </button>
            ) : (
              <Link
                href="/signin"
                className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}


// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Menu, X } from "lucide-react"
// import logo from "../../../image/Logo.svg"
// import Image from "next/image"
// import { usePathname } from "next/navigation"
// import { useAppDispatch, useAppSelector } from "@/Redux/hook"
// import { logout } from "@/Redux/slice/auth/authSlice"
// import Cookies from "js-cookie"


// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const pathname = usePathname();

//   const isHomePage = pathname === "/";

//   const dispatch = useAppDispatch()
//   const user = useAppSelector((state) => state.auth.user)
//   console.log(user, 'user in navbar');

//   const handleLogout = () => {
//     dispatch(logout())
//     Cookies.remove('token')
//     // Cookies.remove("refreshToken")
//   }


//   return (
//     <header className={`w-full shadow-sm  ${isHomePage ? 'fixed top-0 left-0 z-10 block bg-[#00000066]' : 'bg-black '} `}>
//       <div className="custom-container mx-auto px-4 md:px-6">
//         <div className="flex items-center justify-between h-16 md:h-20">

//           <div className="flex gap-12 items-center">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Link href="/" className="flex items-center">
//                 <Image src={logo} width={100} height={100} alt="logo" />
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden md:flex items-center space-x-8">
//               <Link
//                 href="/"
//                 className="text-[#fff] text-[18px]  hover:text-blue-500 px-1 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 transition-colors"
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/createTranscript"
//                 className="text-[#fff] text-[18px]  hover:text-blue-500 px-1 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 transition-colors"
//               >
//                 Create Your Transcript
//               </Link>
//               <Link
//                 href="/pricing"
//                 className="text-[#fff] text-[18px]  hover:text-blue-500 px-1 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 transition-colors"
//               >
//                 Pricing
//               </Link>
//               <Link
//                 href="/faqAccordion"
//                 className="text-[#fff] text-[18px]  hover:text-blue-500 px-1 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 transition-colors"
//               >
//                 FAQ
//               </Link>
//             </nav>

//           </div>


//           {/* Login Button */}

//           {
//             user && user ? (
//               <div className="hidden md:block">
//                 <Link
//                   href="/signin"
//                   className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40% rounded-full hover:from-blue-500 hover:to-blue-700 focus:outline-none "
//                 >
//                   Log in
//                 </Link>
//               </div>
//             ) : (
//               <div className="hidden md:block">
//                 <button
//                   onClick={handleLogout}
//                   className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40% rounded-full hover:from-blue-500 hover:to-blue-700 focus:outline-none "
//                 >
//                   Log Out
//                 </button>
//               </div>
//             )
//           }

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               <span className="sr-only">Open main menu</span>
//               {isMenuOpen ? (
//                 <X className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
//             <Link
//               href="/"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               href="/create"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Create Your Transcript
//             </Link>
//             <Link
//               href="/pricing"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Pricing
//             </Link>
//             <Link
//               href="/faqAccordion"
//               className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               FAQ
//             </Link>
//             <Link
//               href="/signin"
//               className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-full hover:from-blue-500 hover:to-blue-700"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Log in
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }