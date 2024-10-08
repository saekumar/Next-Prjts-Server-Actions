import { Comment } from '../models/comment.js'
import { Post } from '../models/Post.js'
import ErrorResponse from '../utils/error.js'

export const commentOnPost = async (req, res, next) => {
  try {
    const { user } = req
    const { id } = req.params
    const { text } = req.body

    if (!id) {
      next(new ErrorResponse('Id is not defined', 404))
    }
    // console.log(user)
    // console.log(id)
    // console.log(text)
    const comment = await Comment.create({
      comment: text,
      user: user.userId,
      post: id,
    })
    await comment.save()
    await Post.findByIdAndUpdate(id, { $push: { comments: comment._id } })
    return res
      .status(200)
      .json({ message: 'Commented added successfully', success: true })
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const { user } = req
    const { postid, commentid } = req.params
    if (!postid) {
      next(new ErrorResponse('Undefined Post id', 404))
    }
    if (!commentid) {
      return next(new ErrorResponse('Undefined Comment id', 404))
    }
    const comment = await Comment.findById(commentid)
    if (!comment) {
      return next(new ErrorResponse('No comment with this id', 404))
    }
    const post = await Post.findById(postid).select('-password')
    if (
      post.author.toString() === user.userId ||
      comment.user.toString() === user.userId
    ) {
      await Comment.findByIdAndDelete(commentid)
      await Post.findByIdAndUpdate(postid, { $pull: { comments: commentid } })
      return res
        .status(200)
        .json({ success: true, message: 'Comment deleted successfully' })
    } else {
      return next(new ErrorResponse('Unauthorized action', 403))
    }
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}

export const editComment = async (req, res, next) => {
  try {
    const { user } = req
    const { postid, commentid } = req.params
    const { commentText } = req.body

    if (!postid) {
      return next(new ErrorResponse('Invalid PostId or Undefined PostId', 404))
    }
    if (!commentid) {
      return next(
        new ErrorResponse('Invalid CommentId or Undefined CommentId', 404)
      )
    }
    if (!commentText) {
      return next(new ErrorResponse('Comment shoould not be empty', 400))
    }
    const post = await Post.findById(postid)
    console.log('post from edit comment', post)
    if (!post) {
      return next(new ErrorResponse('Post Unavilable', 404))
    }
    const checkCommentFromPost = await post.comments.filter(
      (com) => com._id.toString() === commentid
    )
    console.log(checkCommentFromPost)
    if (!checkCommentFromPost) {
      return next(
        new ErrorResponse('PostId and CommentId are not related', 404)
      )
    }
    const commentFromUser = await Comment.findById(commentid)
    console.log(commentFromUser)

    if (!commentFromUser || commentFromUser.user.toString() !== user.userId) {
      return next(new ErrorResponse('Unauthorized', 403))
    }

    commentFromUser.comment = commentText
    await commentFromUser.save()
    res
      .status(200)
      .json({ success: true, message: 'Comment updated successfully' })
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}

export const likeUnlikeComment = async (req, res, next) => {
  try {
    const { user } = req
    const { postid, commentid } = req.params

    if (!postid) {
      return next(new ErrorResponse('Invalid PostId or Undefined PostId', 404))
    }
    if (!commentid) {
      return next(
        new ErrorResponse('Invalid CommentId or Undefined CommentId', 404)
      )
    }
    const comment = await Comment.findById(commentid)
    if (!comment) {
      return next(new ErrorResponse('Undefined or Invalid Comment id', 404))
    }
    if (comment.likes.includes(user.userId)) {
      await Comment.findByIdAndUpdate(commentid, {
        $pull: { likes: user.user.userId },
      })
      res.status(200).json({ success: true, message: 'Comment unliked' })
    } else {
      await Comment.findByIdAndUpdate(commentid, {
        $push: { likes: user.user.userId },
      })
      res.status(200).json({ success: true, message: 'Comment Liked' })
    }
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 400))
  }
}
