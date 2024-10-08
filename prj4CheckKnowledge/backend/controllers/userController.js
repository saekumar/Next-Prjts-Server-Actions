import { User } from '../models/user.js'
import { Post } from '../models/Post.js'
import bcrypt from 'bcrypt'
import ErrorResponse from '../utils/error.js'
import jwt from 'jsonwebtoken'
import { generateJWT } from '../utils/generateJwt.js'
import { Tag } from '../models/tags.js'

export const createUser = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      })
    }

    const existingUserbyUsername = await User.findOne({ username })
    if (existingUserbyUsername) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this username',
      })
    }

    const hashedPass = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPass,
    })

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: 'User creation failed. Something went wrong.',
      })
    }
    await newUser.save()

    const userWithoutPass = await User.findById(newUser._id).select('-password')

    const token = await generateJWT({
      name,
      email,
      username,
      userId: newUser._id,
    })

    if (!token) {
      return next(new ErrorResponse('Error generating token', 500))
    }

    return res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: {
        user: userWithoutPass,
        token: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    })
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body

    const searchCriteria = email ? { email } : { username }

    const existingUser = await User.findOne(searchCriteria)

    if (!existingUser) {
      return next(
        new ErrorResponse(
          `User not found. Please check your ${email ? 'email' : 'username'}.`,
          404
        )
      )
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password)

    if (!passwordMatch) {
      return next(
        new ErrorResponse('Incorrect password. Please try again.', 400)
      )
    }

    // Generate a JWT token for the user
    const token = await generateJWT({
      name: existingUser.name,
      email: existingUser.email,
      username: existingUser.username,
      userId: existingUser._id,
      posts: existingUser.posts,
    })

    if (!token) {
      return next(
        new ErrorResponse(
          'An error occurred while logging in. Please try again.',
          500
        )
      )
    }

    const userWithoutPass = await User.findById(existingUser._id).select(
      '-password'
    )

    return res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: { user: userWithoutPass, token: `Bearer ${token}` },
    })
  } catch (error) {
    console.error(error)
    return next(
      new ErrorResponse('An error occurred. Please try again later.', 500)
    )
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password').populate({
      path: 'posts',
      select: 'title description imgUrl',
    })
    if (!user) {
      next(new ErrorResponse('User not exists', 404))
    }

    console.log(user)
    return res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorResponse(`${error.message}`, 400))
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').populate({
      path: 'posts',
      select: 'title description imgUrl',
    })
    if (!users || users.length === 0) {
      next(new ErrorResponse('somethig went wrong', 400))
    }
    return res.status(200).json({
      success: true,
      message: 'Users fetched Successfully',
      data: users,
    })
  } catch (error) {
    console.log(error)
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return next(new ErrorResponse('Id should not be null', 404))
    }
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return next(new ErrorResponse('User not found', 404))
    }
    const posts = await Post.find({ author: id })
    console.log(posts)
    const postIds = posts.map((post) => post._id)
    console.log(postIds)
    await Post.deleteMany({ author: id })

    await Tag.updateMany(
      { posts: { $in: postIds } },
      { $pull: { posts: { $in: postIds } } }
    )
    await Tag.deleteMany({ posts: { $size: 0 } })
    return res.status(200).json({
      success: true,
      message: 'User deleted Successfully',
      data: user,
    })
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}
