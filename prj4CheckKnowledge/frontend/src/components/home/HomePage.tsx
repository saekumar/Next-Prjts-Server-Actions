import React from 'react'
import { cn } from '@/lib/utils'
import { Spotlight } from '../ui/spotlight'
import { SparklesCore } from '../ui/sparkles'
import { MacbookScroll } from '../ui/macbook-scroll'
import linearImage from '../../assests/linear.webp'
import TypeWriterComponent from './TypeWriterComponent'
import Scroll from './Scroll'
import SpotLightComponent from './SpotLightComponent'
import SparklesComponent from './SparklesComponent'
import { Grid } from './Grid'
import Image from 'next/image'
import { ContainerScroll } from '../ui/container-scroll-animation'
import { LampContainer } from '../ui/lamp'

const HomePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center ">
      <SpotLightComponent />

      <SparklesComponent />
      {/* <LampContainer>SaeNus</LampContainer> */}

      <TypeWriterComponent />

      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Artificial Intelligence
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={linearImage}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
      <Grid />
    </div>
  )
}

export default HomePage
