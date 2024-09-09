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

import { Label } from '@/components/ui/label'
import { addfav } from '@/store/slices/postSlice'
import Link from 'next/link'
import { TPost } from '@/types/PostType'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { removeFromFav } from '@/store/slices/postSlice'
import { useRouter } from 'next/navigation'
type Props = {
  post: TPost
}

const FavPostCard = ({ post }: Props) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const favItems = useAppSelector((state) => state.favItemSlice.post)
  console.log(favItems)
  const handleremoveFromFav = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    try {
      dispatch(removeFromFav(post))
      console.log(favItems)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
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
          <Button
            variant="outline"
            onClick={() => router.push(`posts/${post.id}`)}
          >
            View Full
          </Button>
          <Button onClick={handleremoveFromFav}>Remove from Fav</Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default FavPostCard
