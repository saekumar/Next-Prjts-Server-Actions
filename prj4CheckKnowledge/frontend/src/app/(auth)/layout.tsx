import React from 'react'

type Props = {
  children: React.ReactNode
}

const Authlayout = ({ children }: Props) => {
  return (
    <div className="">
      <div className="min-h-screen w-full flex items-center justify-center bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
        {children}
      </div>
    </div>
  )
}
export default Authlayout
