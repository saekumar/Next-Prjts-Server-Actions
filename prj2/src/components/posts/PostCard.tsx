import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
type Props = {
  post: {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
  }
}

const PostCard = ({ post }: Props) => {
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl text-center">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-1">
          <CardDescription className="overflow-hidden ">
            <h1 className="text-2xl font-mono break-words">{post.content}</h1>
          </CardDescription>
          <Label className="mt-5">
            Created At: {new Date(post.createdAt).toLocaleDateString()}
          </Label>
          <br />
          <Label>
            {post.updatedAt
              ? `Recently updated on ${new Date(
                  post.updatedAt
                ).toLocaleDateString()} `
              : ''}
          </Label>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Full</Button>
          <Button>Add to Fav</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PostCard
