import React from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const EditPost = ({ posts, handleEdit, editTitle, editBody, setEditTitle, setEditBody }) => {

    // Get the ID attribute that will be set in the route
    const { id } = useParams(); // get the parameters from the url
    // create an array where the post id matches 
    const post = posts.find(post => (post.id).toString() == id);

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])
    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    {/* Include a form, to submit a new post */}
                    <form className='newPostForm' onSubmit={(e) => {e.preventDefault()}}>
                        <label htmlFor='postTitle'>Title</label>
                        <input
                            id="postTitle"
                            type="text"
                            requiredvalue={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor='postBody'>Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => { setEditBody(e.target.value) }}
                        />
                        <button
                            type="submit"
                            onClick={() => {handleEdit(post.id)}}
                        >
                            Submit
                        </button>
                    </form>
                </>
            } 
            {
                !editTitle && 
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to='/'>Go Back Home</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost