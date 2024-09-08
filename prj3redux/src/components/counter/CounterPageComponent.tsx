'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Minus, Plus } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks'
import { decrement, increment } from '@/store/slices/counterSlice'
import { RootState } from '@/store/store'

type Props = {}

const CounterPageComponent = (props: Props) => {
  const dispatch = useAppDispatch()
  const count = useAppSelector((state: RootState) => state?.counter?.value)
  const handleIncrement = () => {
    dispatch(increment())
  }
  const handleDecrement = () => {
    dispatch(decrement())
  }
  return (
    <div className="flex flex-col space-y-9 justify-between">
      <h1 className="text-5xl font-extrabold">Counetr App</h1>
      <div className="flex items-center justify-around">
        <Button onClick={handleDecrement}>
          <Minus />
        </Button>
        <h2 className="">{count}</h2>
        <Button onClick={handleIncrement}>
          <Plus />
        </Button>
      </div>
    </div>
  )
}

export default CounterPageComponent
