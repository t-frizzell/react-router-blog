import React from 'react'
import { useParams, Link } from 'react-router-dom'

const PostPage = ({posts, handleDelete}) => {
    const {id} = useParams(); // get the parameters from the url
    const post = posts.find(post => (post.id).toString() == id);

  return (
    <main className='PostPage'>
        <article className='post'>
            {post && 
                <>
                    <h2> {post.title} </h2>
                    <p className='postDate'>{post.datetime}</p>
                    <p className='postBody'>{post.body}</p>
                    <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button> </Link>
                    <button className='deleteButton' onClick={() => {handleDelete(post.id)}}>Delete Post</button>
                </>
            }
            {/* Add conditional if post is incorrect */}
            {
                !post &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, thats disappointing.</p>
                    <p>
                        <Link to='/'>Back to Home</Link>
                    </p>
                </>
            }
        </article>
    </main>
  )
}

export default PostPage