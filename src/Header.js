import React from 'react'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';

const Header = ({ title, width }) => {
    return (
        <header className='Header'>
            <h1>
                {title}
            </h1>
            {/* Show different icons depending on the current screen resolution */}
            {width < 760 ? <FaMobileAlt />
                : width < 992 ? <FaTabletAlt />
                    : <FaLaptop />}
        </header>
    )
}

export default Header