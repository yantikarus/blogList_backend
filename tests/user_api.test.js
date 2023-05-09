const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  //initialized test db with a root user
  beforeEach( async() => {
    //clear all the user
    await User.deleteMany({})
    //create hashed password with bcrypt
    const passwordHash = await bcrypt.hash('secret', 10)
    //create root user
    const user = new User({ username: 'root', passwordHash })
    //save it to database
    await user.save()
  })

  test('invalid username that less than 3 chars are not created and returns 400', async () => {
    const usersAtStarts = await helper.usersInDb()
    console.log('the user at starts ', usersAtStarts)

    const newUser = {
      username: 'la',
      name:'lalala',
      password:'love'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('User validation failed')
    const usersAtEnd = await helper.usersInDb()
    console.log('user at end', usersAtEnd)
    expect(usersAtEnd).toEqual(usersAtStarts)
  })

  test('request without password or password less than 3 chars are not created and returns 400', async () => {
    const usersAtStarts = await helper.usersInDb()
    console.log('the user at starts ', usersAtStarts)

    const newUserWithoutPassword = { username: 'lalalal', name: 'lala' }
    const newUserWithPassLessThanThree = { username: 'mamaci', name: 'lala', password: 'lo' }

    const result = await api
      .post('/api/users')
      .send(newUserWithoutPassword)
      .expect(400)

    const result2 = await api
      .post('/api/users')
      .send(newUserWithPassLessThanThree)
      .expect(400)


    expect(result.body.error).toContain('please provide a password with at least 3 chars long')
    expect(result2.body.error).toContain('please provide a password with at least 3 chars long')

    const usersAtEnd = await helper.usersInDb()
    console.log('user at end', usersAtEnd)
    expect(usersAtEnd).toEqual(usersAtStarts)


  })

  test('username that already exist non unique, will not be created and return 400', async () => {
    const usersAtStarts = await helper.usersInDb()

    const newUser ={
      username: 'root',
      name: 'iamroot',
      password: 'root'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('User validation failed')
    const usersAtEnd = await helper.usersInDb()
    console.log('user at end', usersAtEnd)
    expect(usersAtEnd).toEqual(usersAtStarts)
  })


})