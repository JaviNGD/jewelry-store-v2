import React from 'react'
import headerClass from './header.module.css'
import { Link } from 'react-router-dom'

export default function Header() {

  const user = {
    name: 'User'
  }

  const cartItems = {
    totalItems: 0
  }

  const logout = () => {
    console.log('logout')
  }

  return (
    <header className={headerClass.header}>
      <div className={headerClass.container}>
        <Link to="/" className={headerClass.logo}>Jewelry Store</Link>
        <nav>
          <ul>
            {
              // If user is logged in, show the user's name and a dropdown menu
              user ? (
                <li className={headerClass.menuContainer}>
                  <Link to="/profile">Hello {user.name} !</Link>
                  <div className={headerClass.menu}>
                    <Link to="/profile">Profile</Link>
                    <Link to="/orders">Orders</Link>
                    <a onClick={logout}>Logout</a>
                  </div>
                </li>
              ) : (
                // If user is not logged in, show the login link
                <Link to="/login">Login</Link>
              )}
                <li>
                  <Link to="/cart">Cart <span className={headerClass.cartTotalItems}>{cartItems.totalItems}</span></Link>
                </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
