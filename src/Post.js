import React from 'react'
import { Link } from 'react-router-dom'

// A functional component representing each post.
const Post = ({post}) => {
  return (
    <article className='post'>
        <Link to={`/post/${post.id}`}>
        <h2> {post.title} </h2>
        <p className='postDate'>{post.datetime}</p>
        </Link>
        {/* Display the entire post body if 25 or less, or a snippet */}
        <p className='postBody'>{post.body.length <= 25 ? post.body : `${(post.body).slice(0,25)}...`}</p>
    </article>
  )
}

export default Post