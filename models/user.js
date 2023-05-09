const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
//Step creating user
//1. create the models 2. ensure the related blogs are refer in user model and blog model by adding type and ref
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  passwordHash: String,
  name: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

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