'use client'

import React, { useState } from 'react'
import { ModeToggle } from '../themes/ToggleTheme'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserProfile } from '../userprofile/UserProfile'
type Props = {}

const navItems = ['Dashboard', 'About', 'Contact']
const Navbar = (props: Props) => {
  const router = useRouter()
  const [user, setUser] = useState({})
  let userDetails = localStorage.getItem('user')
  userDetails = userDetails ? JSON.parse(userDetails) : userDetails
  let username = userDetails?.user?.username
  console.log(userDetails)
  return (
    <div className="mx-auto p-3 h-14 shadow-lg flex items-center justify-between bg-gray-800 rounded-md">
      <h2 className="text-2xl text-white">Logo</h2>
      <div className="flex items-center space-x-11 justify-between">
        {navItems.map((item, index) => (
          <div className="text-white" key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between space-x-6">
        <Button onClick={() => router.push('/login')}>
          {username ? 'Logout' : 'Login'}
        </Button>
        <UserProfile />
        <ModeToggle />
      </div>
    </div>
  )
}

export default Navbar
