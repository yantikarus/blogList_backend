const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
// 1 . destructure the request body
  const { username, name, password } = req.body
  //2. hash the password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  //3. create user object with hashed password
  const user = new User({
    username,
    name,
    passwordHash
  })
  //4. save the user in the DB
  const savedUser = await user.save()
  // 5 return the response
  res.status(201).json(savedUser)

})


module.exports = usersRouter