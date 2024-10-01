import React from 'react'
import { Link } from 'react-router-dom' // To link back to the homepage

const Missing = () => {
  return (
    <main className='Missing'>
        <h2>Page Not Found</h2>
        <p>Well, thats diappointing</p>
        <p>
            <Link to='/'>Go back to Home</Link>
        </p>
    </main>
  )
}

export default Missing