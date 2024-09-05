import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { number } from 'zod'

type Props = {
  id: string
}
type TUserdata = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
  __v: number
  __id: string
}

const ProfileCard = ({ id }: Props) => {
  let userData: TUserdata

  let userDetails = localStorage.getItem('user')
  userData = userDetails?.user

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-600 h-[500px] w-[800px] flex items-center justify-center">
        <Card className="w-full sm:w-[320px] md:w-[360px] lg:w-[400px] bg-gray-700 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl md:text-3xl font-semibold text-white">
              Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-2 text-gray-400 text-sm md:text-base"></div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <a href="/blog/:id" className="underline">
              View full
            </a>
            <Button className="">Edit</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ProfileCard
