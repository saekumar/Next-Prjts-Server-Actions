'use client'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

import { getAllPosts } from '@/actions/PostSchema'
import { PaginationDemo } from './PaginationDemo'

type Props = {}
type Post = {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const PostsComponent = (props: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  useEffect(() => {
    async function getPosts() {
      let AllPosts = await getAllPosts()
      setPosts(AllPosts as Post[])
    }
    getPosts()
  }, [])

  // Get current posts based on pagination
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
          currentPosts.map((post: Post, index) => (
            <div className="" key={index}>
              <PostCard post={post} />
            </div>
          ))}
      </div>
      {/* Pagination Component */}
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
