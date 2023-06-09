const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')



beforeEach( async() => {
  await Blog.deleteMany({})
  console.log('deleting')
  await Blog.insertMany(helper.initialBlogs)
  console.log('adding the initial')
})
//verify the blog list app returns the correct amount of blog post in the JSON format

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('check blog id to be defined', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map(r => r.id)
  console.log(ids)
  expect(ids[0]).toBeDefined()
})

//adding blog
test('valid blog can be added', async () => {
  const newBlog = {
    title: 'i am magnet of abundance',
    author: 'mamaci',
    url: 'www.googleyeyesagain.com',
    likes:100
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const title = response.body.map(r => r.title)
  console.log(title)

  expect(response.body).toHaveLength(helper.initialBlogs.length +1)
  expect(title).toContain('i am magnet of abundance')
})

test('if likes property missing , default to 0', async () => {
  const newBlog = {
    title: 'last array',
    author: 'mamaci',
    url: 'www.googleyeyesagain.com',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const likesArr= response.body.map(r => r.likes)
  const lastOne = likesArr.pop()
  console.log(lastOne)
  expect(lastOne).toBe(0)
})

test('return 400 if title missing', async () => {
  const newBlog = {
    author: 'mamaci',
    url: 'www.googleyeyesagain.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('return 400 if url missing', async () => {
  const newBlog = {
    author: 'mamaci',
    title: 'booya'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

describe('deletion of a blog', () => {
  test ('succeed with status code 204 if the id is valid', async () => {
    const blogAtStarts = await helper.blogsInDb()
    const blogToDelete = blogAtStarts[0]
    console.log(blogAtStarts[0])

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map(r => r.title)
    expect(title).not.toContain(blogToDelete.title)
  })
})


afterAll( async() => {
  await mongoose.connection.close()
})