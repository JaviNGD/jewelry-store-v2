import React from 'react'
import cartClass from './cartPage.module.css'
import { useCart } from '../../hooks/useCart';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';

export default function CartPage() {

    const {cart, removeFromCart, changeQuantity} = useCart();


  return (
    <>
    <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

    {cart && cart.items.length > 0 && 
    <div className={cartClass.container}>
        <ul className={cartClass.list}>
            {cart.items.map(item => 
                <li key={item.item.id}>
                <div>
                    <Link to={`/product/${item.item.id}`}>
                    <img src={`/product/${item.item.imageUrl}`} alt={item.item.name} />
                    </Link>
                </div>
                <div>
                    <Link to={`/product/${item.item.id}`}>{item.item.name}</Link>
                </div>
                <div>
                    <select value={item.quantity} onChange={e => changeQuantity(item, Number(e.target.value))}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div>
                    <Price price={item.price} />
                </div>
                <div>
                    <button className={cartClass.remove_button} onClick={() => removeFromCart(item.item.id)}> 🗑️ Remove </button>
                </div>
            </li>
            )}
        </ul>
        <div className={cartClass.checkout}>
            <div className={cartClass.items_count}> {cart.cartCount} </div>
            <div className={cartClass.total_price}> <Price price={cart.cartTotal} /> </div>
        </div>
        <Link to="/checkout" className={cartClass.checkout_button}> Proceed to Checkout </Link>
    </div>
    }
    </>
    )
}
