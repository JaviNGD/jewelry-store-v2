import React from 'react'
import categoryClass from './category.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function Category({categories}) {
  // Get the current location. 
  const location = useLocation();

  return (
    <div className={categoryClass.container}>
        {
            categories.map(category => (
                <Link key={category.name} to={`/category/${category.name}`} className={location.pathname === `/category/${category.name}` ? categoryClass.activeCategory : ''}>
                    {category.name} ({category.count})
                </Link>
        ))}
    </div>
  )
}
