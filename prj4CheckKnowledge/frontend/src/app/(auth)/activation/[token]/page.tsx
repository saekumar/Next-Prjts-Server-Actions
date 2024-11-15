'use client'
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from '@/components/ui/text-reveal-card'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {}

const ActivationPage = (props: Props) => {
  const router = useRouter()
  const [error, setError] = useState('')
  const { token } = useParams()
  console.log(token)
  useEffect(() => {
    if (token) {
      activateAccount()
    }
  }, [token])

  const activateAccount = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/activation', {
        token,
      })
      console.log(res)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="">
      {error ? (
        <div className="text-white text-lg font-semibold">
          Something went wrong
        </div>
      ) : (
        <div className="flex flex-col items-center  text-white shadow-lg rounded-2xl p-8 w-96 gap-y-6 transition duration-300 ease-in-out transform hover:scale-105">
          <TextRevealCard
            text="Your Account has been"
            revealText="Activated Successfully "
            className="relative text-lg font-bold text-gray-300 hover:text-white"
          >
            <TextRevealCardTitle className="text-2xl font-semibold">
              Sometimes, you just need to see it.
            </TextRevealCardTitle>
            <TextRevealCardDescription className="text-sm text-gray-400">
              This is a text reveal card. Hover over the card to reveal the
              hidden text.
            </TextRevealCardDescription>
          </TextRevealCard>

          {/* Enhanced Navigation Section */}
          <div className="flex items-center justify-between space-x-4">
            <p className="">Back to Login Page</p>
            <Button className="px-4 py-2  rounded-lg text-[#1A1A1D]  transition duration-200">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActivationPage
