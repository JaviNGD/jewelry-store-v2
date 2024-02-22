import React from 'react'
import thumbnailClass from './thumbnails.module.css'
import { Link } from 'react-router-dom'
import Price from '../Price/Price'

export default function Thumbnails({items}) {
  return (
    // Show a list of items
    <ul className={thumbnailClass.list}>
      {items.map(item => (
        <li key={item.id} className={thumbnailClass.item}>
          <Link to={`/product/${item.id}`}>
            <img className={thumbnailClass.image} src={`/product/${item.imageUrl}`} alt={item.name} />
            <div className={thumbnailClass.content}>
              <div className={thumbnailClass.name}>
                {item.name}
              </div>
              <span className={`${thumbnailClass.favorite} ${item.favorite ? '' : thumbnailClass.not}`}>
                ❤
              </span>
              <div className={thumbnailClass.brand}>
                {item.brand}
              </div>
              <div className={thumbnailClass.price}>
                <Price price={item.price} />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
