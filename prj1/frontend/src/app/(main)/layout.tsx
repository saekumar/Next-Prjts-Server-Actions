import Navbar from '@/components/navbar/Navbar'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default layout
