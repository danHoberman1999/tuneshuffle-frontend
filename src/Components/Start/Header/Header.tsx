import React, { useState } from 'react'
import './style.scss'
import { HeaderItems } from '../../../Lib/Navbar/Data'

const Header = () => {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <nav className='NavbarItems'>
      <h1 className='navbar-logo'>Tuneshuffle</h1>
      <div className='menu-icon' onClick={() => handleClick()}>
        <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
      </div>
      <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
        {HeaderItems.map((items, index) => {
          return (
            <li key={index}>
              <a className={items.name} href={items.url}>
                {items.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Header
