'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createBlog(formdata: FormData) {
  const title = formdata.get('title') as string
  const description = formdata.get('description') as string
  const userId = formdata.get('userId') as string

  if (!title || !description || !userId) {
    throw new Error('Missing required fields')
  }

  await prisma.blog.create({
    data: {
      title,
      description,
      userId,
    },
  })
  revalidatePath('/')

  return { message: 'Blog created successfully' }
}
