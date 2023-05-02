var _ = require('lodash')

const totalLikes = ( blogs ) => {
  const likesArray = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return likesArray.length === 0 ? 0 : likesArray.reduce(reducer, 0)
}

const dummy = ( blogs ) => {
  return 1
}

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.map(blog => blog.likes)
  const fi = blogs.filter(x => x.likes === Math.max(...mostLiked))
  const result = fi.length > 1 ? fi[0] : fi
  const returnObj = {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
  return returnObj
}

// const mostBlogs =(blogs) => {
//   const authorList = blogs.map(blog => blog.author)
//   const countAuthor = _.countBy(authorList)
//   const authorMost = _.max(countAuthor)
//   console.log(countAuthor)
//   console.log(authorMost)

//   //   const filteredBlogs = blogs.filter(x=> x.author ===authorMost)
//   //   console.log(authorList)
//   //   console.log(authorMost)
//   //   console.log(filteredBlogs)
//   //   const result = {
//   //     author: authorMost,
//   //     blogs: filteredBlogs.length
//   //   }
//   return countAuthor

// }
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  // mostBlogs
}