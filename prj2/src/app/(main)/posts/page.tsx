import AddPost from '@/components/posts/AddPost'
import PostsComponent from '@/components/posts/PostsComponent'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const PostsPage = (props: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-700">
      <AddPost />
      <div className="bg-gray-800 p-6 shadow-xl rounded-lg h-auto w-[75vw]">
        <PostsComponent />
      </div>
    </div>
  )
}

export default PostsPage
