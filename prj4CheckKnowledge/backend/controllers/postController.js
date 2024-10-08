import { Post } from '../models/Post.js'
import { Tag } from '../models/tags.js'
import { User } from '../models/user.js'

import ErrorResponse from '../utils/error.js'

export const createPost = async (req, res) => {
  try {
    const { title, description, tags } = req.body

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required.',
      })
    }

    if (!description) {
      return res.status(400).json({
        success: false,
        message: 'Description is required.',
      })
    }

    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one tag is required.',
      })
    }
    const authorId = req.user.userId

    const newPost = await Post.create({
      title,
      description,
      author: authorId,
      tags: [],
    })
    await User.findByIdAndUpdate(authorId, { $push: { posts: newPost._id } })
    const tagIds = []
    for (const tagname of tags) {
      let tag = await Tag.findOneAndUpdate(
        { name: tagname.trim() },
        {
          $addToSet: { posts: newPost._id },
        },
        { new: true, upsert: true }
      )

      tagIds.push(tag._id)
    }
    newPost.tags = tagIds
    await newPost.save()
    return res.status(201).json({
      success: true,
      message: 'Post created successfully!',
      post: newPost,
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      error: error.message,
    })
  }
}

export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return next(new ErrorResponse('Id should not be null', 404))
    }

    const post = await Post.findById(id)
      .populate({
        path: 'author',
        select: 'name username',
      })
      .populate({
        path: 'tags', // Ensure this matches the field name in the Post model
        select: 'name',
        populate: {
          path: 'posts',
          select: 'title description',
        },
      })
      .populate({
        path: 'likes',
        select: 'username name',
      })
      .populate({
        path: 'comments',
        select: 'comment',
        populate: {
          path: 'user',
          select: 'username name',
        },
      })

    if (!post) {
      return next(new ErrorResponse('Post not found', 404))
    }

    console.log(post)
    return res.status(200).json({
      success: true,
      message: 'Post fetched successfully',
      data: post,
    })
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}

export const getAllPosts = async (req, res, next) => {
  try {
    const { user } = req
    const posts = await Post.find()
      .populate({
        path: 'author',
        select: '-password',
      })
      .populate({
        path: 'likes',
        select: 'email username name',
      })
    console.log(posts)
    res.status(200).json({
      success: true,
      message: 'All posts',
      data: posts,
    })
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}

export const updatePost = async (req, res, next) => {
  try {
    const user = req.user
    const { id } = req.params
    const { title, description } = req.body

    const userPost = user.posts.find((postid) => postid === id)
    if (userPost === undefined) {
      return next(
        new ErrorResponse('You are not authorized to update this post', 404)
      )
    }

    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    )

    if (!updatedPost) {
      return next(new ErrorResponse('Post not found', 404))
    }

    console.log('Updated Post', updatedPost)
    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    })
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { user } = req
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      return next(new ErrorResponse('Post not found', 404))
    }
    const postId = user.posts.find((postid) => postid === id)
    if (postId === undefined) {
      return next(
        new ErrorResponse('You are not authorised to perform this action', 400)
      )
    }

    await Post.findByIdAndDelete(postId)

    await User.findByIdAndUpdate(user.userId, { $pull: { posts: id } })

    await Tag.updateMany(
      { posts: { $in: postId } },
      { $pull: { posts: postId } }
    )
    await Tag.deleteMany({ posts: { $size: 0 } })

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    })
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}

export const likeUnlikePost = async (req, res, next) => {
  try {
    const { user } = req
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
      return next(new ErrorResponse('Post not found', 404))
    }

    if (!post.likes.includes(user.userId)) {
      await Post.findByIdAndUpdate(id, { $push: { likes: user.userId } })
      return res
        .status(200)
        .json({ message: 'You liked the post', success: true })
    } else {
      await Post.findByIdAndUpdate(id, { $pull: { likes: user.userId } })
      return res
        .status(200)
        .json({ message: 'You Unliked the post', success: true })
    }
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}

// const generateItems = () => {
//   const items = []
//   for (let i = 0; i < 30; i++) {
//     items.push({
//       id: i,
//       price: (Math.random() * 100).toFixed(2),
//       desc: `Description of item ${i}`,
//     })
//   }
//   return items
// }
// export const getItems = async (req, res, next) => {
//   try {
//     const items = generateItems()
//     return res.status(200).json({
//       success: true,
//       data: items,
//     })
//   } catch (error) {
//     return next(new ErrorResponse(`${error.message}`, 400))
//   }
// }
