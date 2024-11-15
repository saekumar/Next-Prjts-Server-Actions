import express from 'express'
import {
  activateUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/user', createUser)
router.post('/login', loginUser)
router.post('/activation', activateUser)
router.get('/user', getAllUsers)
router.get('/user/:id', getUserById)
router.delete('/user/:id', deleteUser)
export default router
