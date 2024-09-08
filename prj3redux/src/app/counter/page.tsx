import CounterPageComponent from '@/components/counter/CounterPageComponent'
import React from 'react'

type Props = {}

const Counter = (props: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <CounterPageComponent />
    </div>
  )
}

export default Counter
