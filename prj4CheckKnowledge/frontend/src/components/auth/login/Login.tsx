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
import { Input } from '@/components/acer/input'
import { Label } from '@/components/acer/label'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Cookies from 'js-cookie'
const LoginSchemaWithMail = z.object({
  email: z.string().nonempty('Email is required').email('Not a valid email'),
  password: z.string().nonempty('Password is required'),
})

const LoginSchemaWithUsername = z.object({
  username: z.string().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
})

const Login = () => {
  const [loginOption, setLoginOption] = useState<'username' | 'email'>('email')
  const [user, setUser] = useState()
  const [token, setToken] = useState()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ email?: string; username?: string; password: string }>({
    resolver: zodResolver(
      loginOption === 'email' ? LoginSchemaWithMail : LoginSchemaWithUsername
    ),
  })

  const [viewPass, setViewPass] = useState(false)

  const handleEmail = async (data: { email?: string; password: string }) => {
    console.log('Email Login Data:', data)
    try {
      let res = await axios.post(
        'https://next-prjts-server-actions.onrender.com/api/v1/login',
        {
          email: data.email,
          password: data.password,
        }
      )
      console.log(res)

      if (res.status === 200) {
        // Get user and token from response
        const { user, token } = res.data.data

        // Store user and token in useState
        setUser(user)
        setToken(token)

        // Store user and token in cookies instead of localStorage
        Cookies.set('user', JSON.stringify(user), { expires: 7 }) // Expires in 7 days
        Cookies.set('token', token, { expires: 7 })

        toast.success('User logged in successfully')
        router.push('/')
        console.log(user)
      }
    } catch (error) {
      console.log('error', error)
      toast.error(`${(error as any)?.response?.data?.message}`)
    }
  }

  const handleUsername = async (data: {
    username?: string
    password: string
  }) => {
    console.log('Username Login Data:', data)
    try {
      let res = await axios.post(
        'https://next-prjts-server-actions.onrender.com/api/v1/login',
        {
          username: data.username,
          password: data.password,
        }
      )
      console.log(res)

      if (res.status === 200) {
        // Get user and token from response
        const { user, token } = res.data.data

        // Store user and token in useState
        setUser(user)
        setToken(token)

        // Store user and token in cookies instead of localStorage
        Cookies.set('user', JSON.stringify(user), { expires: 7 }) // Expires in 7 days
        Cookies.set('token', token, { expires: 7 })

        toast.success('User logged in successfully')
        router.push('/')
        console.log(res.data.data)
      }
    } catch (error) {
      console.log(error)
      toast.error(`${(error as any)?.response?.data?.message}`)
    }
  }

  return (
    <Tabs
      defaultValue="email"
      onValueChange={(value) => setLoginOption(value as 'username' | 'email')}
      className="w-[450px] h-[450px]"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="email" className="font-semibold ">
          Email
        </TabsTrigger>
        <TabsTrigger value="username" className="font-semibold ">
          Username
        </TabsTrigger>
      </TabsList>
      <TabsContent value="email">
        <Card>
          <form onSubmit={handleSubmit(handleEmail)} className="">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Login with Your Registered Email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className="bg-gray-950"
                  placeholder="Enter your registered email"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-700">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={viewPass ? 'text' : 'password'}
                  className="bg-gray-950"
                  placeholder="Enter your Password"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-red-700">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex items-center space-x-8 justify-between">
              <div className="flex flex-col items-start justify-between">
                <p className="text-sm">Not have an Account?</p>
                <Link href="/register" className="underline text-gray-500">
                  Click Here
                </Link>
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              >
                Login
                <BottomGradient />
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="username">
        <Card>
          <form onSubmit={handleSubmit(handleUsername)} className="">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
              <CardDescription className="text-center">
                Login with Username
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  className="bg-gray-950"
                  placeholder="Enter your username"
                  {...register('username')}
                />
                {errors.username && (
                  <p className="text-red-700">{errors.username.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={viewPass ? 'text' : 'password'}
                  className="bg-gray-950"
                  placeholder="Enter your Password"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-red-700">{errors.password.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex items-center space-x-7 justify-between">
              <div className="flex flex-col items-start justify-between">
                <p className="text-sm">Not have an Account?</p>
                <Link href="/register" className="underline text-gray-500">
                  Click Here
                </Link>
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              >
                Login
                <BottomGradient />
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  )
}

export default Login
