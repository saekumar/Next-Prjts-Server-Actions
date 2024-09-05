const axios = require('axios').default

export const Allblogs = async () => {
  const blogs = await axios.get('http://localhost:4000/blogs')
  console.log(blogs.data)
  return blogs.data
}
