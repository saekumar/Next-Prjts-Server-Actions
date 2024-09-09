'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '../ui/button'
import { ProfileCard } from '../profile/ProfileButton'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { User } from '@/types/UserTypes'
import { useAppSelector } from '@/store/hooks'
import { FavButton } from '../fav/FavButton'
import { useFavItems } from '@/hooks/getfavItems'
import { TPost } from '@/types/PostType'

type Props = {}
const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'About',
    url: '/about',
  },
  {
    name: 'Contact',
    url: '/contact',
  },
]

const Navbar = (props: Props) => {
  const router = useRouter()
  const [userD, setUserD] = useState<User | null>()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const { user } = useAppSelector((state) => state.authSlice)
  useEffect(() => {
    setUserD(user)
  }, [user])
  console.log(userD)
  return (
    <div className="relative">
      <div className="mt-2 h-14 p-4 flex items-center justify-between w-full bg-gray-800 shadow-lg md:h-16">
        <div className="text-white text-lg md:text-2xl">
          <Link href="/">Logo</Link>
        </div>

        <div className="hidden md:flex flex-wrap items-center justify-between gap-14 p-5">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer text-white hover:text-gray-400"
            >
              <Link href={item.url}>{item.name}</Link>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="block md:hidden">
          <Button onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-3 p-5">
          <div className="text-white">
            {/* <Button onClick={() => (!userD ? router.push('/login') : '')}>
              {!userD ? 'Login' : 'Fav'}
            </Button> */}
            {!userD && (
              <Button onClick={() => router.push('/login')}>Login</Button>
            )}
            {userD && <FavButton />}
          </div>
          {userD && <ProfileCard user={userD} />}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg z-50 p-6 flex flex-col items-start">
          <Button className="self-end mb-6" onClick={toggleMobileMenu}>
            <svg
              className="w-6 h-6 "
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </Button>

          <div className="flex flex-col items-center justify-center w-full gap-6 ">
            {navItems.map((item, index) => (
              <div key={index} className="cursor-pointer">
                <Button className="w-28">
                  <Link href={item.url}>{item.name}</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center w-full mt-10 gap-4">
            <Button onClick={() => (!userD ? router.push('/login') : '/')}>
              {!userD ? 'Login' : 'Fav'}
            </Button>
            <div className="text-white">
              {userD && <ProfileCard user={userD} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
