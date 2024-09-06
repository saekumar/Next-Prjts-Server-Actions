'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createPost(postData: FormData) {
  try {
    const title = postData.get('title') as string
    const description = postData.get('description') as string
    const userid = postData.get('userid') as string
    let res = await prisma.post.create({
      data: {
        title,
        content: description,
        userid,
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

export async function getSinglePost(postid: string) {
  try {
    let res = await prisma.post.findFirst({
      where: { id: postid },
    })
    console.log(res)
    if (res) {
      return res
    }
    return { message: 'something went wrong' }
  } catch (error) {
    return { message: 'Error in getting single Post' }
  }
}
