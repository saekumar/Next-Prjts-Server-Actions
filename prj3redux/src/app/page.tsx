'use client'
import { useAppSelector } from '@/store/hooks/hooks'
import { RootState } from '@/store/store'
import Link from 'next/link'

export default function Home() {
  const value = useAppSelector((state: RootState) => state.counter.value)
  console.log(value)
  return (
    <div className="">
      <div className="p-8 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center font-extrabold tracking-tight lg:text-5xl">
          REDUX TOOL KIT EXAMPLES
        </h1>
        <ul className="text-xl my-6 ml-6 space-y-9">
          <li className="underline">
            <Link href="/counter">Counter App</Link>
          </li>
          <li className="underline">
            <Link href="/shop">Shoppin Cart</Link>
          </li>
          <li className="underline">
            <Link href="/form">Multi Step Form</Link>
          </li>
          <li className="underline">
            <Link href="/auth">User Authentication</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
