import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Enter your mail'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'Enter your Username'],
      unique: true,
      trim: true,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, 'Enter your Password'],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true }
)

export const User = mongoose.model('User', userSchema)
