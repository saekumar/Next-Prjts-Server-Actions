import SingularPostComponent from '@/components/posts/SingularPostComponent'
import React from 'react'

type Props = {
  params: {
    postid: string
  }
}

const SinglePostPage = ({ params }: Props) => {
  return (
    <div>
      <SingularPostComponent postid={params.postid} />
    </div>
  )
}

export default SinglePostPage
