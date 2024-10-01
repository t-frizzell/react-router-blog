import React from 'react'

const NewPost = ({handleSubmit, postTitle, setPostTitle, postBody, setPostBody}) => {
  return (
    <main className='NewPost'>
        <h2>

        </h2>   
        {/* Include a form, to submit a new post */}
        <form className='newPostForm' onSubmit={(e) => {handleSubmit(e)}}>
            <label htmlFor='postTitle'>Title</label>
            <input
                id="postTitle"
                type="text"
                requiredvalue={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
                id="postBody"
                required
                value={postBody}
                onChange={(e) => {setPostBody(e.target.value)}}
            />
            <button
                type="submit"
            >
                Submit
            </button>
        </form>
    </main>
  )
}

export default NewPost