import React from 'react'
import { cn } from '@/lib/utils'
import { Spotlight } from '../ui/spotlight'
import { SparklesCore } from '../ui/sparkles'
import { MacbookScroll } from '../ui/macbook-scroll'

import TypeWriterComponent from './TypeWriterComponent'
import Scroll from './Scroll'
import SpotLightComponent from './SpotLightComponent'
import SparklesComponent from './SparklesComponent'
import Grid from './Grid'

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center ">
      <SpotLightComponent />

      <SparklesComponent />

      <TypeWriterComponent />

      <Scroll />
      <Grid />
    </div>
  )
}

export default HomePage
