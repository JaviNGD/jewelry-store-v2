import React, { useEffect, useState } from 'react'
import itemPageClass from './itemPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getItemById } from '../../services/itemService';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';

export default function ItemPage() {
    const [item, setItem] = useState({});
    const { itemId } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Add the item to the cart and navigate to the cart page
    const handleAddToCart = () => {
        addToCart(item);
        navigate('/cart');
    }

    // Fetch the item by its id
    useEffect(() => {
        getItemById(itemId).then(setItem);
    }
    , [itemId]);

  return (
    // Display the item details
    item && <div className={itemPageClass.container}>
        <img className={itemPageClass.image} src={`/product/${item.imageUrl}`} alt={item.name} />
        <div className={itemPageClass.details}>
            <div className={itemPageClass.header}>
                <span className={itemPageClass.name}>{item.name}</span>
                <span className={`${itemPageClass.favorite} ${item.favorite? '' : itemPageClass.not}`}>❤</span>
            </div>
            <span className={itemPageClass.brand}>{item.brand}</span>
            <div className={itemPageClass.description}>{item.description}</div>
            <div className={itemPageClass.info}>
                <div className={itemPageClass.category}><span>Category:</span> {item.category}</div>
                <div className={itemPageClass.stock}><span>Stock:</span> {item.stock}</div>
            </div>
            <div className={itemPageClass.price}><Price price={item.price} /></div>

            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    </div>
  )
}
