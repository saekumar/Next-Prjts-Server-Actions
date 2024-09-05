import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('API route hit')
  try {
    const { title, description } = await req.json()
    console.log('Received data:', { title, description })

    const userDetails = localStorage.getItem('user')
    let userId = userDetails ? (JSON.parse(userDetails).user._id as string) : ''

    if (!title || !description || !userId) {
      console.log('Missing required fields')
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        description,
        userId,
      },
    })

    console.log('Blog created successfully:', newBlog)
    return NextResponse.json({ message: 'Blog created successfully' })
  } catch (error) {
    console.log('Error in POST route:', error)
    return NextResponse.json(
      { message: 'Failed to create a blog' },
      { status: 400 }
    )
  }
}
