import express from 'express'
import {
  createPost,
  deletePost,
  getAllPosts,
  // getItems,
  getPostById,
  likeUnlikePost,
  updatePost,
} from '../controllers/postController.js'
import { Protect } from '../middlewares/auth.js'
import {
  commentOnPost,
  deleteComment,
  editComment,
  likeUnlikeComment,
} from '../controllers/commentController.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

// router.get('/getitems', getItems)
// Post Routes
router.post('/post', Protect, upload.single('image'), createPost)
router.get('/post/:id', Protect, getPostById)
router.get('/post', Protect, getAllPosts)
router.post('/post/:id', Protect, updatePost)
router.delete('/post/:id', Protect, deletePost)

// Like Route
router.post('/post/like/:id', Protect, likeUnlikePost)

// Comment routes
router.post('/post/comment/:id', Protect, commentOnPost)
router.delete('/post/:postid/comment/:commentid', Protect, deleteComment)
router.patch('/post/:postid/editcomment/:commentid', Protect, editComment)
router.post('/post/:postid/comment/:commentid/like', Protect, likeUnlikeComment)
export default router
