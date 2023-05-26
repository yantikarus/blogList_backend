var _ = require('lodash')

const totalLikes = ( blogs ) => {
  //map the blog likes to extract the blog likes only in one array
  const likesArray = blogs.map(blog => blog.likes)
  //define a reducer function
  const reducer = (sum, item) => {
    return sum + item
  }

  return likesArray.length === 0 ? 0 : likesArray.reduce(reducer, 0)
}

const dummy = ( blogs ) => {
  return 1
}

const favoriteBlog = (blogs) => {
  //1. extract the blog likes only into one array
  const mostLiked = blogs.map(blog => blog.likes)
  //find one blog that has blog likes maximum num, spread operator needed in Math.max otherwise math max return NAN
  const fi = blogs.filter(x => x.likes === Math.max(...mostLiked))
  //if there are more than one blog that has same highest like, return the first one
  //filter js always return array
  const result = fi.length > 1 ? fi[0] : fi
  //destructure the result object and save it as variable returnObj and return the obj
  const returnObj = {
    title: result.title,
    author: result.author,
    likes: result.likes
  }
  return returnObj
}

// const mostBlogs =(blogs) => {
//   //map the author name
//   const authorList = blogs.map(blog => blog.author)
//   const counts = {}
//   //count how many occurence 
//   for (let i in authorList){
//     counts[i] = counts[i] ? counts[i] +1 : 1
//   }
//   console.log(counts)
//   let val = Object.values(counts)
//   let maxVal = Math.max(...val)

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