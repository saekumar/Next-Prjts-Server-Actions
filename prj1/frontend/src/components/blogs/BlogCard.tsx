'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '../ui/card'
import { Button } from '../ui/button'

type Props = {
  title: string
  description: string
}

const BlogCard = ({ title, description }: Props) => {
  const handleEdit = () => {
    console.log('okay')
  }

  return (
    <Card className="w-full sm:w-[320px] md:w-[360px] lg:w-[400px] bg-gray-700 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl md:text-3xl font-semibold text-white">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-2 text-gray-400 text-sm md:text-base">
          {description}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <a href="/blog/:id" className="underline">
          View full
        </a>
        <Button className="" onClick={() => handleEdit}>
          Edit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BlogCard
