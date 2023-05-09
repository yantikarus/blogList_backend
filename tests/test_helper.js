const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title : 'first blog',
    author: 'bubuci',
    url: 'www.googleyeyes.com',
    likes:18
  },
  {
    title : 'second blog',
    author: 'cacaca',
    url: 'www.googleyeyes.com',
    likes:8
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'blaballa', url:'lallalal.com', author:'cccc' })
  await blog.save()
  await blog.deleteOne()
  console.log(blog._id.toString())
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  console.log('the users in helper', users)
  return users.map( u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}