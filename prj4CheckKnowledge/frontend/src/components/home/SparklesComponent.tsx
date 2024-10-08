import React from 'react'
import { SparklesCore } from '../ui/sparkles'

type Props = {}

const SparklesComponent = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center relative z-20 mt-28">
      <h1 className="md:text-5xl text-2xl lg:text-7xl font-bold text-center text-white">
        SaeNius
      </h1>
      <div className="relative w-[40rem] h-40 flex items-center justify-center">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"></div>
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        <SparklesCore
          background="transparent"
          minSize={0.1}
          maxSize={0.4}
          particleDensity={1000}
          className="w-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  )
}

export default SparklesComponent
