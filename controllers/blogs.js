const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//1 extract authorization from a request
const getTokenFrom = req => {
  console.log('the request is ', req)
  const authorization = req.get('authorization')
  console.log('the authorization is', authorization)
  if(authorization && authorization.startsWith('bearer ')){
    return authorization.replace('bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs= await Blog.find({}).populate('user', { username:1, name:1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const note = await Blog.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})
//2
blogsRouter.post('/',async (req, res) => {
  const body = req.body
  //verify the authorization from request and the secret code using jwt verify
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  //if no decoded token id,return error
  if(!decodedToken.id){
    return res.status(401).json({ error: 'token invalid' })
  }
  //else find the user in the db by the decoded token id
  const user = await User.findById(decodedToken.id)
  // needs to add if body content is empty
  if(!body.title|| !body.url){
    return res.status(400).json({
      error: 'title or url are missing'
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  //express async errors library is used, therefore next and try catch block no longer needed.
  await  Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

// blogsRouter.put('/:id',  async (req, res) => {
//   res.json("put request")
// //   console.log("put router")
// //   const body = req.body
// //   console.log(body)
// //   console.log("the params is", req.params.id)

// //   const blog = await Blog.findById(req.params.id)
// //   blog.likes = req.body.likes
// //   const updatedBlog = await blog.save()

// //   // const blog = {
// //   //   title: body.title,
// //   //   author: body.author,
// //   //   url:body.url,
// //   //   likes:body.likes,
// //   // }

// //   // const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog,{ new:true } )
// //   res.json(updatedBlog)
// // })
//   // Blog.findByIdAndUpdate(req.params.id, update, {new: true})
//   //   .then(updatedBlog => {
//   //     console.log('the updated response blog is', updatedBlog)
//   //     res.json(updatedBlog)
//   //   })
//   //   .catch(error => next(error))

//     // const updatedBlog = await Blog.findOneAndUpdate(filter, update)
//     // console.log('the updated response blog is')
//     // res.send(200).json(updatedBlog)

//       // const filter = {id: req.params.id}
//   // const update = {likes : body.likes}

// })

module.exports = blogsRouter