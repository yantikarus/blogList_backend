const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
//destructuring the req.body
  const { username, password } = req.body
  // check in db the username
  const user = await User.findOne({ username })
  //check if we find the user in DB, if yes compare password in DB
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  //if user and password are not true
  if(!(user && passwordCorrect)){
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }
  //create user token object
  const userForToken = {
    username: user.username,
    id: user._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter