'use client'
import React, { useState } from 'react'

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { checkUser } from '@/actions/UserActions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
export function LoginPage() {
  const router = useRouter()
  const [userDetails, setUserDetails] = useState({ email: '', password: '' })
  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let res = await checkUser(userDetails.email, userDetails.password)
    if (res.message === 'Logged in successfully') {
      toast.success(res.message)
      router.push('/')
      localStorage.setItem('user', JSON.stringify(res.user))
    } else {
      toast.error(res.message)
    }
  }
  return (
    <Card className="w-[350px]">
      <form onSubmit={handleClick}>
        <CardHeader>
          <CardTitle className="text-center text-3xl">Login </CardTitle>
          <CardDescription className="mt-3 font-light text-center">
            Enter your registered email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your Registered email"
                required
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter Your Password"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col items-start justify-between">
            <p className="text-sm">Not have an Account?</p>
            <Link href="/register" className="underline text-gray-400">
              Click Here
            </Link>
          </div>

          <Button type="submit">Login</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
