'use client'

import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type PaginationProps = {
  totalPosts: number
  postsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function PaginationDemo({
  totalPosts,
  postsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  return (
    <Pagination>
      <PaginationContent className="bg-gray-800 mt-3 rounded-md w-max space-x-2">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            className="hover:bg-gray-700 hover:text-orange-50 ml-3 shadow-md"
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i + 1}
              onClick={() => onPageChange(i + 1)}
              className="hover:bg-white hover:text-gray-950"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            className="hover:bg-gray-700 hover:text-orange-50 ml-3"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
