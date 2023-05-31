const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
  const blogs = []
  //create a variable that hold the value passed to the function
  const result = listHelper.dummy(blogs)
  //what should you expect?
  expect(result).toBe(1)
})

describe('total Likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithLotsofBlog = [
    {
      _id: '5',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '3',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
  ]

  test('of empty list is zero', () => {
    const zeroList = []
    const result = listHelper.totalLikes(zeroList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithLotsofBlog)
    expect(result).toBe(30)
  })

})

describe('favorite blogs', () => {
  const listBlogs = [
    {
      _id: '5',
      title: 'ciciciic',
      author: 'Eddy',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '2',
      title: 'lalalal',
      author: 'Ebubuci',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '10',
      title: 'bbbbbbb',
      author: 'Ebubuci',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '12',
      title: 'ccccccc',
      author: 'Ebubuci',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '3',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
    {
      _id: '8',
      title: 'the second one',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0
    },
  ]

  test('favorite blogs is', () => {
    const result = listHelper.favoriteBlog(listBlogs)
    expect(result).toEqual(
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 15,
      })
  })

  test('author has most blogs', () => {
    const result = listHelper.mostBlogs(listBlogs)
    expect(result).toEqual({
      author: 'Ebubuci',
      blogCount: 3
    })
  })


})


