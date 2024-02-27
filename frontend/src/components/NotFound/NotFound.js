import React from 'react'
import notFoundClass from './notFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound({message, linkRoute, linkText}) {
  return (
    <div className={notFoundClass.container}>
        {message}
        <Link to={linkRoute}>{linkText}</Link>
    </div>
  )
}

NotFound.defaultProps = {
    message: 'No items found',
    linkRoute: '/',
    linkText: 'Go back to home'
}
