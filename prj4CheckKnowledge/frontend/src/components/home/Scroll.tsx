import React from 'react'
import { MacbookScroll } from '../ui/macbook-scroll'
import Link from 'next/link'
import Badge from './Badge'

type Props = {}

const Scroll = (props: Props) => {
  return (
    <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
        title={
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        }
        badge={
          <Link href="https://peerlist.io/manuarora">
            <Badge className="h-10 w-10 transform -rotate-12" />
          </Link>
        }
        src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTOMYfPiKHW6aNvvw_NwrTcuvY0cLnVMsE0tLnr-u2oog-F7L_y"
        showGradient={false}
      />
    </div>
  )
}

export default Scroll
