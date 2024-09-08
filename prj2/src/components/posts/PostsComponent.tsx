'use client'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

import { getAllPosts } from '@/actions/PostSchema'
import { PaginationDemo } from './PaginationDemo'
import { UserDetails } from '@/global/GlobalUser'

type TPost = {
  id: string
  title: string
  userid: string
  content: string
  createdAt: Date
  updatedAt: Date
}
type Props = {
  posts: TPost[]
}

const PostsComponent = ({ posts }: Props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-4">
        {currentPosts &&
          currentPosts.map((post: TPost, index) => (
            <div className="" key={index}>
              <PostCard post={post} />
            </div>
          ))}
      </div>

      <PaginationDemo
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default PostsComponent
