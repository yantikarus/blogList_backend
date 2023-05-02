const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs= await Blog.find({})
  res.json(blogs)
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     res.json(blogs)
  //   })
  //   .catch(error => next(error))
})
blogsRouter.post('/',async (req, res) => {
  const body = req.body
  // needs to add if body content is empty
  if(!body.title|| !body.url){
    return res.status(400).json({
      error: 'content missing'
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
  // blog
  //   .save()
  //   .then(result => {
  //     res.status(201).json(result)
  //   })
  //   .catch(error => next(error))
})

blogsRouter.delete('/:id', async (req, res) => {
  //express async errors library is used, therefore next and try catch block no longer needed.
  await  Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter