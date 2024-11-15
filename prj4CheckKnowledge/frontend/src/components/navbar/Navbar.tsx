'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button'
// import { ProfileCard } from '../profile/ProfileButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FloatingNav } from './FloatingNavbar'
import Profile from './Profile'

// import { User } from '@/types/UserTypes'
// import { useAppSelector } from '@/store/hooks'
// import { FavButton } from '../fav/FavButton'
// import { useFavItems } from '@/hooks/getfavItems'
// import { TPost } from '@/types/PostType'

type Props = {}
export const navItems = [
  { name: 'About', link: '#about' },
  { name: 'Projects', link: '#projects' },
  { name: 'Testimonials', link: '#testimonials' },
  { name: 'Contact', link: '#contact' },
]

const Navbar = (props: Props) => {
  const router = useRouter()
  let userData = localStorage.getItem('user')
  console.log(userData)
  const parsedUserData = userData ? JSON.parse(userData) : null

  console.log(parsedUserData)

  return (
    <div className="relative bg-black/[0.96]  ">
      <div className="  p-4 flex items-center justify-between w-full shadow-lg md:h-16">
        <div className="text-white text-lg md:text-2xl">
          <Link href="/">Logo</Link>
        </div>

        <FloatingNav navItems={navItems} />

        <div className="hidden md:flex items-center gap-3 p-5">
          <div className="text-white">
            {userData && <Profile user={parsedUserData} />}
            {!userData && (
              <Button onClick={() => router.push('/login')}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
