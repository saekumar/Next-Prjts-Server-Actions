import express from 'express'
import connectDB from './db/connectDb.js'
import dotenv from 'dotenv'
import UserRoutes from '../backend/routes/UserRoutes.js'
import PostRoutes from '../backend/routes/PostRoutes.js'
import ErrorHandler from '../backend/middlewares/errorHandler.js'
import cors from 'cors'

const app = express()

dotenv.config({
  path: './config/.env',
})

app.use(express.json())

app.use(cors({ origin: 'http://localhost:3000' }))

connectDB()

app.use('/api/v1', UserRoutes)
app.use('/api/v1', PostRoutes)

app.use(ErrorHandler)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
