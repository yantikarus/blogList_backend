const mongoose = require('mongoose')
//Step creating user
//1. create the models 2. ensure the related blogs are refer in user model and blog model by adding type and ref
const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    delete returnedObject.blogs
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User