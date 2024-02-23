import React from 'react'
import categoryClass from './category.module.css';
import { Link } from 'react-router-dom';

export default function Category({categories}) {
  return (
    <div className={categoryClass.container}>
        {
            categories.map(category => (
                <Link key={category.name} to={`/category/${category.name}`}>
                    {category.name} ({category.count})
                </Link>
        ))}
    </div>
  )
}
