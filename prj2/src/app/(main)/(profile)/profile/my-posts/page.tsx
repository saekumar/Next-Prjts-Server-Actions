'use client'
import { getUserPosts } from '@/actions/PostSchema'
import AddPost from '@/components/posts/AddPost'
import PostsComponent from '@/components/posts/PostsComponent'
import { useAppSelector } from '@/store/hooks'

import { TPost } from '@/types/PostType'
import React, { useEffect, useState } from 'react'

type Props = {}

const MyPosts = (props: Props) => {
  const [posts, setPosts] = useState<TPost[]>([])
  const userid: string | undefined = useAppSelector(
    (state) => state.authSlice.user?.id
  )
  if (userid) {
    useEffect(() => {
      async function getUserposts(userid: string) {
        let res = await getUserPosts(userid)
        setPosts(res as TPost[])
      }
      getUserposts(userid)
    }, [])
  }
  return (
    posts && (
      <div className="relative flex flex-col items-center justify-center min-h-screen ">
        <AddPost />
        <div className="bg-yellow-100 p-6 shadow-xl rounded-lg h-auto w-[75vw]">
          <PostsComponent posts={posts} />
        </div>
      </div>
    )
  )
}

export default MyPosts
