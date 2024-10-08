import Navbar from '@/components/navbar/Navbar'

import React from 'react'

type Props = {
  children: React.ReactNode
}

const Mainlayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  )
}

export default Mainlayout
