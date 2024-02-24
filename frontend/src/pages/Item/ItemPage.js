import React, { useEffect, useState } from 'react'
import itemPageClass from './itemPage.module.css';
import { useParams } from 'react-router-dom';
import { getItemById } from '../../services/itemService';
import Price from '../../components/Price/Price';

export default function ItemPage() {
    const [item, setItem] = useState({});
    const { itemId } = useParams();

    useEffect(() => {
        getItemById(itemId).then(setItem);
    }
    , [itemId]);

  return (
    item && <div className={itemPageClass.container}>
        <img className={itemPageClass.image} src={`/product/${item.imageUrl}`} alt={item.name} />
        <div className={itemPageClass.details}>
            <div className={itemPageClass.header}>
                <span className={itemPageClass.name}>{item.name}</span>
                <span className={`${itemPageClass.favorite} ${item.favorite? '' : itemPageClass.not}`}>❤</span>
                <span className={itemPageClass.brand}>{item.brand}</span>
            </div>
            <div className={itemPageClass.description}>{item.description}</div>
            <div className={itemPageClass.price}><Price price={item.price} /></div>
            <div className={itemPageClass.category}>Category: {item.category}</div>
            <div className={itemPageClass.stock}>Stock: {item.stock}</div>

            <button>Add to Cart</button>
        </div>
    </div>
  )
}
