'use client'
import { getUserPosts } from '@/actions/PostSchema'
import AddPost from '@/components/posts/AddPost'
import PostsComponent from '@/components/posts/PostsComponent'
import { UserDetails } from '@/global/GlobalUser'
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
const MyPosts = (props: Props) => {
  const [posts, setPosts] = useState<TPost[]>([])
  const userid: string = UserDetails()?.id as string
  useEffect(() => {
    async function getUserposts(userid: string) {
      let res = await getUserPosts(userid)
      setPosts(res as TPost[])
    }
    getUserposts(userid)
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

export default MyPosts
