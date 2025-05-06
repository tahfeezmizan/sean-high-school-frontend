"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  Users,
  Car,
  Home,
  LogOut,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/Redux/hook";
import Cookies from "js-cookie";
import { logout } from "@/Redux/slice/auth/authSlice";
import { useLogoutMutation } from "@/Redux/apis/auth/authApi";


type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const router = useRouter()
  const [activeItem, setActiveItems] = useState<string | null >("Overview");
  const pathname = usePathname();
  const items = pathname.split('/').pop();
    const [logOut] = useLogoutMutation()

  const dispatch = useAppDispatch()
  const handleLogout = async() => {
    dispatch(logout())
    await logOut({}).unwrap
    Cookies.remove('refreshToken')
    Cookies.remove('token')
    router.push("/");
  }


  useEffect(()=>{
    setActiveItems(`${items}`)
  }, [items])
  


  const menuItems = [
    {
      icon: <LayoutGrid size={20} />,
      label: "dashboard",
      key: "1",
      path: "/dashboard",
    },
    {
      icon: <Users size={20} />,
      label: "orderList",
      key: "2",
      path: "/dashboard/orderList",
    },
    {
      icon: <Car size={20} />,
      label: "pricing",
      key: "3",
      path: "/dashboard/pricing",
    },
    {
      icon: <Home size={20} />,
      label: "testimonials",
      key: "4",
      path: "/dashboard/testimonials",
    },
    
  ];

 

  return (
    <div>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setCollapsed(!collapsed)}
      >
        <MenuIcon size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 bottom-0 z-40 h-screen bg-[#DEE8F1] shadow-lg transition-all duration-300 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 w-80 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 h-20 flex items-center border-b border-gray-200">
          <div className="text-4xl font-bold text-[#FF8A65]">
            <Link href="/">LOGO</Link>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-4 px-2">
            {menuItems.map(
              (item) =>
                item.path && (
                  <li key={item.key} onClick={() => setActiveItems(item.label)}>
                    <Link
                      href={item.path}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-[20px] font-[400] transition-colors ${
                        activeItem === item.label
                          ? "bg-blue-500 text-white"
                          : "text-[#475467] hover:bg-gray-100"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          <button onClick={() => 
            handleLogout()
          } className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm font-medium text-gray-700 bg-gray-100 rounded-md transition-colors cursor-pointer">
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
