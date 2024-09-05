const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE', // Specify the allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Specify the allowed headers
  })
)
const connetDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://saikumarpuppala249:1234@cluster0.4twfo.mongodb.net/blogsdatabase'
    )
    console.log('Datbase connected successfully')
  } catch (error) {
    console.log('error while connecting database', error)
  }
}

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmPassword: String,
})

const User = mongoose.model('user', userSchema)
const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
})
const Blog = mongoose.model('blog', blogSchema)

app.post('/register', async (req, res) => {
  try {
    let { name, username, email, password, confirmPassword } = req.body
    const existingUserWithEmail = await User.findOne({ email })
    const existingUserWithUsername = await User.findOne({ username })
    if (existingUserWithEmail) {
      res.status(400).json({
        message: 'User already Registered with this mail.Please login',
      })
    }
    if (existingUserWithUsername) {
      res.status(400).json({ message: 'usernamae already exists.Be unique' })
    }
    const newUser = await User.create({
      name,
      username,
      email,
      password,
      confirmPassword,
    })

    res
      .status(200)
      .json({ message: 'User Registered Successfully', user: newUser })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'error at post route of user login' })
  }
})

app.post('/blogs', async (req, res) => {
  try {
    let { title, description, user } = req.body
    if (!title || !description || !user) {
      res.status(400).json({ message: 'Fill all the fields' })
    } else {
      const newBlog = await Blog.create({
        title,
        description,
        user,
      })

      res
        .status(200)
        .json({ message: 'Blog Added Successfully', success: true })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'error at blogs post route', error })
  }
})
app.get('/blogs', async (req, res) => {
  try {
    let blogs = await Blog.find()
    console.log(blogs)
    res.status(200).json({ blogs: blogs })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'error at getting blogs' })
  }
})
app.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body
    if (!email || !password)
      res.status(400).json({ message: 'Please fill all the fields' })
    const existingUser = await User.findOne({ email })
    if (!existingUser)
      res.status(400).json({ message: 'User Not registered or Invalid Mail' })
    else {
      const databasePass = existingUser.password
      if (databasePass !== password)
        res.status(400).json({ message: "Email and Password doesn't match" })
      else {
        res
          .status(200)
          .json({ message: 'user logged in Succesfully', user: existingUser })
      }
    }
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({ success: false, message: 'error at user login route', error })
  }
})
app.get('/blogs:')

app.listen(4000, () => {
  console.log('server started at port 4000')
  connetDb()
})
