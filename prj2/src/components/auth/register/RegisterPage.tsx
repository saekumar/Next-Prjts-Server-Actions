'use client'
import React, { useState } from 'react'
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
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from '@/schemas/PostSchema'

import { createUser } from '@/actions/UserActions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
type Props = {}

const RegisterPage = (props: Props) => {
  const router = useRouter()
  const [viewPass, setViewPass] = useState(false)
  type RegisterUser = {
    id: string
    fullname: string
    username: string
    email: string
    password: string
    confirmpassword: string
  }
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<RegisterUser>({ resolver: zodResolver(registerFormSchema) })

  const handleClick = async (userData: RegisterUser) => {
    console.log(userData)

    let res = await createUser(userData)
    console.log(res)
    if (res?.message === 'Error creating  user') {
      toast.error(res?.message)
    } else {
      toast.success(res.message)
      router.push('/login')
    }
    reset()
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center text-3xl">Register </CardTitle>
        <CardDescription className="mt-3 font-light text-center">
          Enter your Email and other Details here
        </CardDescription>
      </CardHeader>
      {/* Form should use onSubmit and handleSubmit */}
      <form onSubmit={handleSubmit(handleClick)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                placeholder="Enter your Full Name"
                {...register('fullname')}
              />
              {errors.fullname && (
                <p className="text-sm text-red-600">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter Your Username"
                {...register('username')}
              />
              {errors.username && (
                <p className="text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your  Email"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Enter your Password"
                  type={viewPass ? 'text' : 'password'}
                  {...register('password')}
                />
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setViewPass(!viewPass)}
                >
                  {viewPass ? <Eye /> : <EyeOff />}
                </span>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmpassword">Confirm Password</Label>

              <div className="relative">
                <Input
                  id="confirmpassword"
                  placeholder="Enter your Password again"
                  type={viewPass ? 'text' : 'password'}
                  {...register('confirmpassword')}
                />
                <span
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={() => setViewPass(!viewPass)}
                >
                  {viewPass ? <Eye /> : <EyeOff />}
                </span>
              </div>
              {errors.confirmpassword && (
                <p className="text-sm text-red-600">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col items-start justify-between">
            <p className="text-sm">Already have an Account?</p>
            <Link href="/login" className="underline text-gray-500">
              Click Here
            </Link>
          </div>

          {/* Submit button now triggers form submission */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Register'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default RegisterPage
