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

const mostBlogs =(blogs) => {
  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(_.keys(authorCounts), author => authorCounts[author]);
  const blogCount = authorCounts[topAuthor]
  return {author : topAuthor, blogCount: blogCount }
}

const mostLikes =(blogs) => {
  const listOfLikes = blogs.map(x => x.likes)
  const mostNum = Math.max(...listOfLikes)
  const popular = blogs.filter( blog => blog.likes === mostNum)
  const returnObj = { author : popular[0]['author'], likes: popular[0]['likes'] }
  return returnObj
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}