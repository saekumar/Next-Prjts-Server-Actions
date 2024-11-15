import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useState } from 'react'
import { CardBody, CardContainer, CardItem } from '../ui/3d-card'
import Link from 'next/link'
import { FaHeart, FaShareAlt, FaChevronDown, FaEllipsisV } from 'react-icons/fa'
import { Button } from './button'
export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  title,
  description,
  image,
  author,
}: {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  image: string
  author: {
    name: string
    authorId: string
    username: string
  }
}) => {
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  return (
    <div className="max-w-sm mt-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="bg-red-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">
            {author.name.slice(0, 1).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {author.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              September 14, 2016
            </p>
          </div>
        </div>
        <Button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <FaEllipsisV />
        </Button>
      </div>

      <Image
        src={image}
        alt={title ? (typeof title === 'string' ? title : 'Image') : 'Image'}
        width={700}
        height={700}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
        <Button className="text-gray-500 hover:text-red-500">
          <FaHeart />
        </Button>
        <Button className="text-gray-500 hover:text-blue-500">
          <FaShareAlt />
        </Button>
        <Button
          className={`transform transition-transform ${
            expanded ? 'rotate-180' : 'rotate-0'
          }`}
          onClick={handleExpandClick}
        >
          <FaChevronDown />
        </Button>
      </div>

      {expanded && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-2">Method:</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            {description}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            {description}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            {description}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
      )}
    </div>
  )
}
