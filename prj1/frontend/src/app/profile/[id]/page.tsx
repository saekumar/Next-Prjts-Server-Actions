'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import ProfileCard from '@/components/profile/ProfileCard'
type Userid = {
  params: {
    id: string
  }
}

const ProfileWithId = ({ params }: Userid) => {
  const { id } = params
  console.log(id)

  return (
    <div>
      <ProfileCard id={id} />
    </div>
  )
}

export default ProfileWithId
