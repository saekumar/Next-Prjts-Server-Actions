'use client'

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
import { Input } from '../ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { blogSchema } from '@/form-schemas/schema'
import { createBlog } from '@/actions/blogActions'

type TblogSchema = {
  title: string
  description: string
}

export function AddBlog() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TblogSchema>({ resolver: zodResolver(blogSchema) })

  const onSubmit = async (data: TblogSchema) => {
    try {
      const userDetails = localStorage.getItem('user')
      const userId = userDetails ? JSON.parse(userDetails).user._id : ''

      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('userId', userId)

      const response = await createBlog(formData)
      toast.success(response.message)
      reset()
      setIsOpen(false)
    } catch (error) {
      toast.error('Failed to create blog')
      console.error(error)
    }
  }

  return (
    <div className="mb-16">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Add Blog
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Add Your Blog Here
            </AlertDialogTitle>
            <AlertDialogDescription>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <Input
                  id="title"
                  type="text"
                  {...register('title')}
                  placeholder="Blog title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
                <Textarea
                  id="description"
                  placeholder="Blog description"
                  className="h-40"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setIsOpen(false)}>
                    Cancel
                  </AlertDialogCancel>
                  <Button type="submit" variant="outline">
                    Continue
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
