'use client'
import { getAllPosts } from '@/actions/PostSchema'
import AddPost from '@/components/posts/AddPost'
import PostsComponent from '@/components/posts/PostsComponent'
import { Button } from '@/components/ui/button'

import { useAppSelector } from '@/store/hooks'
import React, { useEffect, useState } from 'react'

type Props = {}
type TPost = {
  id: string
  title: string
  userid: string
  content: string
  createdAt: Date
  updatedAt: Date
}
const PostsPage = (props: Props) => {
  const [posts, setPosts] = useState<TPost[]>([])
  const userid: string = useAppSelector(
    (state) => state.authSlice.user?.id
  ) as string
  const AllPosts = getAllPosts(userid)
  console.log(AllPosts)
  useEffect(() => {
    async function getPosts() {
      let AllPosts = await getAllPosts(userid)
      setPosts(AllPosts as TPost[])
    }
    getPosts()
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen ">
      <AddPost />
      <div className="bg-yellow-100 p-6 shadow-xl rounded-lg h-auto w-[75vw]">
        <PostsComponent posts={posts} />
      </div>
    </div>
  )
}

export default PostsPage
