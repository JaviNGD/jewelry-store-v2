import React from 'react'
import headerClass from './header.module.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  // Get the user and logout function from the useAuth hook to display the user's name in the header
  const {user, logout} = useAuth();

  // Get the cart from the useCart hook to display the total number of items in the cart in the header 
  const {cart} = useCart();

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
                  <Link to="/cart">Cart <span className={headerClass.cartTotalItems}>{cart.cartCount}</span></Link>
                </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
