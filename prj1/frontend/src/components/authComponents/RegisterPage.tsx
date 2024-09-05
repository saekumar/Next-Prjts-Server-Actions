'use client'

import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormschema } from '@/form-schemas/schema'
type Props = {}
type RegisteredUserDetails = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterPage = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<RegisteredUserDetails>({
    resolver: zodResolver(registerFormschema),
  })
  const router = useRouter()

  const handleClick = async (userdata: RegisteredUserDetails) => {
    console.log(userdata)
    let res = await axios.post('http://localhost:4000/register', {
      name: userdata.name,
      username: userdata.username,
      email: userdata.email,
      password: userdata.password,
      confirmPassword: userdata.confirmPassword,
    })

    toast(res.data.message)
    if (res.status === 200) router.push('/login')

    reset()
  }
  const [viewPass, setViewPass] = useState(false)
  const toggleViewPassword = () => {
    setViewPass(!viewPass)
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[420px]">
        <form onSubmit={handleSubmit(handleClick)}>
          <CardHeader>
            <CardTitle className="text-center text-3xl ">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your Full Name"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="username"
                  placeholder="Eneter your Username"
                  {...register('username')}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  placeholder="Eneter your  Email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your Password"
                    type={viewPass ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={toggleViewPassword}
                  >
                    {viewPass ? (
                      <AiOutlineEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </span>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    placeholder="Enter your Password again"
                    type={viewPass ? 'text' : 'password'}
                    {...register('confirmPassword')}
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={toggleViewPassword}
                  >
                    {viewPass ? (
                      <AiOutlineEye size={20} />
                    ) : (
                      <AiOutlineEyeInvisible size={20} />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex flex-col text-gray-400">
              <div>Already have an Account?</div>
              <a href="/login" className=" underline hover:text-blue-400">
                click here
              </a>
            </div>

            <Button type="submit">Register</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default RegisterPage
