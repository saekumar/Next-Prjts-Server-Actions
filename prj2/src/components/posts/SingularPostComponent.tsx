'use client'
import { getSinglePost } from '@/actions/PostSchema'
import prisma from '@/lib/prisma'
import { Post } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@radix-ui/react-dropdown-menu'
type Props = {
  postid: string
}
type TPostData = {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const SingularPostComponent = ({ postid }: Props) => {
  const [post, setPost] = useState<TPostData | null>(null)
  useEffect(() => {
    async function getPostData() {
      let postData = await getSinglePost(postid)

      setPost(postData as TPostData)
    }

    getPostData()
  }, [postid])

  console.log(post, typeof post)
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl text-center">{post?.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-1">
          <CardDescription className="overflow-hidden ">
            <h1 className="text-2xl font-mono break-words">{post?.content}</h1>
          </CardDescription>
          <Label className="mt-5">
            Created At:{' '}
            {post?.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : 'Unknown'}
          </Label>
          <br />
          <Label>
            {post?.updatedAt
              ? `Recently updated on ${new Date(
                  post.updatedAt
                ).toLocaleDateString()}`
              : ''}
          </Label>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button>Add to Fav</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default SingularPostComponent
