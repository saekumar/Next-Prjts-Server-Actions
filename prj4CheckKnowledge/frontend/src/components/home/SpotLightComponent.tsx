import React from 'react'
import { Spotlight } from '../ui/spotlight'
import { Boxes, BoxesCore } from '../ui/background-boxes'
import { cn } from '@/lib/utils'

const SpotLightComponent = () => {
  return (
    <div>
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="white"
      />

      <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
    </div>
  )
}

export default SpotLightComponent
