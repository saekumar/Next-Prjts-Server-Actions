import Navbar from '@/components/navbar/Navbar'
import React, { ReactNode } from 'react'

type Props = {
  children: React.ReactNode
}

const Mainlayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Mainlayout
