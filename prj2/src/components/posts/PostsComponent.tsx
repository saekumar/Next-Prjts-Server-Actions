'use client'
import { getAllPosts } from '@/actions/PostSchema'
import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'

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
  useEffect(() => {
    async function getPosts() {
      let AllPosts = await getAllPosts()

      setPosts(AllPosts as Post[])
    }
    getPosts()
  }, [])

  return (
    <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-4">
      {posts &&
        posts.map((post: Post, index) => (
          <div className="" key={index}>
            <PostCard post={post} />
          </div>
        ))}
    </div>
  )
}

export default PostsComponent
