import express from 'express'
import connectDB from './db/connectDb.js'
import dotenv from 'dotenv'
import UserRoutes from '../backend/routes/UserRoutes.js'
import PostRoutes from '../backend/routes/PostRoutes.js'
import ErrorHandler from '../backend/middlewares/errorHandler.js'
import cors from 'cors'
import { cloudinaryConfig } from './utils/cloudinaryconfig.js'

const app = express()

// Load environment variables
dotenv.config({
  path: './config/.env',
})

// Middleware for parsing JSON
app.use(express.json())

// Set up CORS with multiple origins (local and production)
const allowedOrigins = [
  'http://localhost:3000', // Local development frontend
  // 'https://your-production-frontend-url.com', // Replace with actual production URL
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true, // Allow cookies or other credentials
  })
)

// Connect to the database
connectDB()

// Set up routes
app.use('/api/v1', UserRoutes)
app.use('/api/v1', PostRoutes)

// Global error handler
app.use(ErrorHandler)

// Start the server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
