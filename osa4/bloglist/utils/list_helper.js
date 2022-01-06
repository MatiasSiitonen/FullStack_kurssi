// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce(( sum, blog ) => {
        return sum + blog.likes
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    let favoriteBlog = blogs.reduce( (previous, current) => {
        return (current.likes > previous.likes) ? current : previous
    })

    return favoriteBlog
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
