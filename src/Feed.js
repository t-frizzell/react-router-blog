import React from 'react'
import Post from './Post'

// This component will 
const Feed = ({posts}) => {
  return (
    // iterate through the posts array, inside a HTML fragment
    <>
        {posts.map(post => (
            <Post 
                key={post.id}
                post={post}
            />
        ))}
    </>
  )
}

export default Feed