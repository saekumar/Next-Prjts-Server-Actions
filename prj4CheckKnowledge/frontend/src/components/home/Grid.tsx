'use client'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { BentoGrid, BentoGridItem } from '../ui/bento-grid'
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from '@tabler/icons-react'
import { toast } from 'sonner'
import axios from 'axios'
import Cookies from 'js-cookie'

export const Grid = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const token = Cookies.get('token') // Retrieve token from cookies

    const fetchPosts = async () => {
      if (!token) return // Exit if token is not set

      try {
        let res = await axios.get(
          'https://next-prjts-server-actions.onrender.com/api/v1/post',
          {
            headers: { authorization: token },
          }
        )
        console.log(res.data)
        setPosts(res.data.data)
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error)
        } else {
          console.log(error)
        }
        toast.error('something went wrong')
      }
    }

    fetchPosts()
  }, []) // No dependency on `token` as it’s retrieved directly in the function

  return (
    <BentoGrid className="w-full mx-auto">
      {posts.map(
        (
          post: {
            title: string
            description: string
            image: string
            author: { name: string; username: string; authorId: string }
          },
          i
        ) => (
          <BentoGridItem
            key={i}
            title={post.title}
            description={post.description}
            image={post?.image}
            author={post?.author}
            // className={i === 3 || i === 6 ? 'md:col-span-2' : ''} // Optional styling
          />
        )
      )}
    </BentoGrid>
  )
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
)
