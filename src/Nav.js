// The Navigation Menu
// Directly Under the Header
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search, setSearch}) => {
  return (
    <nav className='Nav'>
        <form className='searchForm' onSubmit={(e) => {e.preventDefault()}}>
            {/* inside forms, always have a label. It is part of the DOM */}
            <label htmlFor='search'>
                Search Posts
            </label>
            <input
                id='search'
                type='text'
                placeholder='Seach Posts'
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
            />
        </form>
        <ul>
            <li>
                {/* Use the link, imported from React Router DOM */}
                {/* Links render to anchor tags, like in HTML*/}
                {/* This will tell react router, dont request link fromthe server, just route to the correct component */}
                <Link to="/">Home </Link>
                <Link to="/post">Post </Link>
                <Link to="/about">About </Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nav