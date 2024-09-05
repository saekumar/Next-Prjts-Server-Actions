'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createPost(postData: FormData) {
  try {
    const title = postData.get('title') as string
    const description = postData.get('description') as string
    await prisma.post.create({
      data: {
        title: title,
        content: description,
      },
    })
    revalidatePath('/posts')
    return { message: 'Post Created Successfully' }
  } catch (error) {
    console.log(error)
    return { message: 'something went wrong' }
  }
}

export async function getAllPosts() {
  try {
    let res = await prisma.post.findMany()

    if (res && res.length > 0) {
      console.log('Posts found:', res)
    } else {
      console.log('No posts found')
    }

    return res
  } catch (error) {
    console.log('Error fetching posts:', error)
    return { message: 'Something went wrong' }
  }
}
