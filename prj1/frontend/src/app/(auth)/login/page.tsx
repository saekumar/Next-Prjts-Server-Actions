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
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {}

const LoginPage = (props: Props) => {
  const router = useRouter()
  const [userdata, setUserdata] = useState({
    email: '',
    password: '',
  })

  const handleClick = async () => {
    console.log(userdata)
    let res = await axios.post('http://localhost:4000/login', {
      email: userdata.email,
      password: userdata.password,
    })
    console.log(res)
    if (res.status === 200) {
      localStorage.setItem('user', JSON.stringify(res.data))

      router.push('/')
      setUserdata({ email: '', password: '' })
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[420px] h-[320px]">
        <CardHeader>
          <CardTitle className="text-center text-3xl ">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your Registered Email"
                  value={userdata.email}
                  onChange={(e) =>
                    setUserdata({ ...userdata, email: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your Password"
                  type="password"
                  value={userdata.password}
                  onChange={(e) =>
                    setUserdata({ ...userdata, password: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="flex flex-col text-gray-400">
            <div>Not have an Account?</div>
            <a href="/register" className=" underline hover:text-blue-400">
              click here
            </a>
          </div>

          <Button onClick={handleClick}>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage
