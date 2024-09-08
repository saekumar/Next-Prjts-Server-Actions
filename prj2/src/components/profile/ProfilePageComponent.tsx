'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../ui/card'
import { Button } from '../ui/button'
import { CheckIcon } from '@radix-ui/react-icons'
import { User } from '@/types/UserTypes'
import { UserDetails } from '@/global/GlobalUser'
type Props = {}

const ProfilePageComponent = (props: Props) => {
  const user: User | null = UserDetails()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-auto w-auto">
        <Card className="w-[380px]">
          <CardHeader>
            <CardTitle className="text-center">Profile Details</CardTitle>
            <CardDescription className="text-center">
              You can edit your details.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <p className="text-sm font-medium leading-none">Name:</p>
              <p className="text-sm">{user?.fullname || 'N/A'}</p>
            </div>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <p className="text-sm font-medium leading-none">Email:</p>
              <p className="text-sm">{user?.email || 'N/A'}</p>
            </div>
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <p className="text-sm font-medium leading-none">Username:</p>
              <p className="text-sm">{user?.username || 'N/A'}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <CheckIcon className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePageComponent
