import React, { Key, useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { AddBlog } from './AddBlog'
import { Allblogs } from '@/hooks/get-all-blogs'
import { Button } from '../ui/button'
import prisma from '@/lib/prisma'

type Props = {}

const Blogs = async (props: Props) => {
  // const [blogs, setBlogs] = useState([])

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const blogsData = await Allblogs()
  //       setBlogs(blogsData.blogs)
  //     } catch (error) {
  //       console.log('Error at fetching All blogs')
  //     }
  //   }
  //   fetchBlogs()
  // }, [])
  const blogs = await prisma.blog.findMany({})
  console.log(blogs)
  return (
    <div className="relative ml-20 mr-20 flex flex-col items-center justify-center gap-10 ">
      <div className="absolute top-0 right-7 mt-7 mr-4 ">
        <AddBlog />
      </div>

      <div className="  mt-20 flex flex-wrap gap-4 space-x-2  items-center justify-center  px-2">
        {blogs.map((blog: any, index: Key) => (
          <BlogCard
            title={blog.title}
            description={blog.description}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Blogs
