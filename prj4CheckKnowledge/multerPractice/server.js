const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname)) // Save with timestamp
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB size limit
  },
}).single('image')

app.post('/imageurl', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        // Custom error message for large files
        return res.status(400).json({
          message: 'File is too large. Maximum size allowed is 1MB.',
        })
      }
      res.status(400).json({
        message: `${err.message}`,
      })
    } else if (err) {
      res.status(400).json({
        message: `${err.message}`,
      })
    } else {
      if (!req.file) {
        return res.status(400).json({
          message: 'Please upload a file.',
        })
      }
      res.status(200).json({
        message: 'File uploaded successfully',
      })
    }
  })
})

app.listen(8000, () => {
  console.log('Server started on port 8000') // Corrected typo in 'port'
})
