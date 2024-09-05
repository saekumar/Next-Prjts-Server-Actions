'use client'
import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'

import { Textarea } from '../ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostSchema } from '@/schemas/PostSchema'
import { createPost } from '@/actions/PostSchema'
import { toast } from 'sonner'
type Props = {}
type TPost = {
  title: string
  description: string
}
const AddPost = () => {
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
    reset,
  } = useForm<TPost>({ resolver: zodResolver(PostSchema) })
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = async (postData: TPost) => {
    let formData = new FormData()
    formData.append('title', postData.title)
    formData.append('description', postData.description)
    let res = await createPost(formData)

    reset()
    setIsOpen(false)
  }
  return (
    <div className="absolute top-6 right-10">
      <div className="mb-16">
        <AlertDialog open={isOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
              Add Post
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center">
                Add Your Post Here
              </AlertDialogTitle>
              <AlertDialogDescription>
                <form className="flex flex-col gap-5">
                  <Input
                    id="title"
                    type="text"
                    placeholder="Post title"
                    className="mt-4"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="text-muted-foreground text-red-600 ">
                      {errors.title.message}
                    </p>
                  )}
                  <Textarea
                    id="description"
                    placeholder="Post Content"
                    className="h-40"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="text-red-600 text-muted-foreground">
                      {errors.description.message}
                    </p>
                  )}
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <Button
                      onClick={handleSubmit(handleClick)}
                      variant="outline"
                      className="bg-gray-950 text-gray-50 hover:text-gray-950 hover:bg-white"
                    >
                      Continue
                    </Button>
                  </AlertDialogFooter>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default AddPost
