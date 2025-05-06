/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { LogOut } from "lucide-react"
import { Button } from "@/ui/Button"
import { Label } from "@/ui/label"
import { Input } from "@/ui/Input"
import Image from "next/image"
import man from '../../image/man.jpg'
import { useAppDispatch } from "@/Redux/hook"
import Cookies from "js-cookie"
import { logout } from "@/Redux/slice/auth/authSlice"
import { useGetMeQuery, useUpdateMeMutation } from "@/Redux/apis/auth/userApi"
import { toast } from "sonner"
import SubscriptionPlan from "./SubscriptionPlan"
import { useRouter } from "next/navigation"
import { useLogoutMutation } from "@/Redux/apis/auth/authApi"

interface UserProfile {
  name: string
  email: string
  avatar: string
}

export default function UserProfileForm() {
  const dispatch = useAppDispatch()
  const { data, isLoading } = useGetMeQuery()
  const myProfile = data?.data
  const [updateMe] = useUpdateMeMutation()
  const router = useRouter()
  const [logOut] = useLogoutMutation()

  const [myPlan, setMyPlan] = useState<boolean>(false)

  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserProfile>({
    defaultValues: {
      name: "",
      email: "",
      avatar: "",
    },
  })

  useEffect(() => {
    if (myProfile) {
      reset({
        name: myProfile.name || "",
        email: myProfile.email || "",
        avatar: myProfile.profilePicture || "",
      })
      setAvatarPreview(myProfile.profilePicture || "")
    }
  }, [myProfile, reset])

  const handleLogout = async() => {
    dispatch(logout())
    await logOut({}).unwrap
    Cookies.remove('refreshToken')
    Cookies.remove('token')
    router.push("/");
  }

  const onSubmit = async (data: UserProfile) => {
    try {
      const formData = new FormData()

      // Append bodyData as stringified JSON
      const bodyData = {
        name: data.name,
        email: data.email,
      }
      formData.append("bodyData", JSON.stringify(bodyData))

      // Append image if selected
      if (selectedImageFile) {
        formData.append("image", selectedImageFile)
      }

      const response = await updateMe(formData).unwrap()
      toast.success(response.message || "Updated Successfully"
      )
      console.log(response, "Updated successfully!")

    } catch (error: any) {
      console.log(error, 'Update error')
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatarPreview(imageUrl)
      setSelectedImageFile(file)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={avatarPreview || man}
              width={100}
              height={100}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{myProfile?.name}</h2>
            <p className="text-gray-600">{myProfile?.email}</p>
          </div>
        </div>

        <Button onClick={handleLogout} type="button" variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>

      <div className="flex gap-6 ">
        <div className="w-1/3">
          <Button onClick={() => setMyPlan(!myPlan)}  className="w-full bg-linear-to-b from-0% from-[#B8DBFC] to-[#2A89E2] to-40%  hover:from-blue-500 hover:to-blue-700 py-4.5 px-10 rounded-full text-white cursor-pointer">
            Get a plan
          </Button>

          {
            myPlan && (
              <SubscriptionPlan/>
            )
          }

        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-4">

            <div className="space-y-2">
              <Label htmlFor="name">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Profile Image</Label>
              <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-b from-[#B8DBFC] to-[#2A89E2] hover:from-blue-500 hover:to-blue-700 py-4.5 px-10 rounded-full text-white cursor-pointer">
              Update Profile
            </Button>


        </form>
      </div>
    </div>
  )
}
