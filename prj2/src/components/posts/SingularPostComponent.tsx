'use client'
import { getSinglePost } from '@/actions/PostSchema'

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
import { TPost } from '@/types/PostType'
type Props = {
  postid: string
}

const SingularPostComponent = ({ postid }: Props) => {
  const [post, setPost] = useState<TPost | null>(null)
  useEffect(() => {
    async function getPostData() {
      let postData = await getSinglePost(postid)

      setPost(postData as TPost)
    }

    getPostData()
  }, [postid])

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
