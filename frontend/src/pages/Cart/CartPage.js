import React from 'react'
import cartClass from './cartPage.module.css'
import { useCart } from '../../hooks/useCart';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import NotFound from '../../components/NotFound/NotFound';

export default function CartPage() {

    const {cart, removeFromCart, changeQuantity} = useCart();


  return (
    <>
    <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

    {/* If the cart is empty, display a message, otherwise display the cart items */}
    {cart.items.length === 0? (<NotFound message="Cart is Empty"/>) :
    <div className={cartClass.container}>
        <ul className={cartClass.list}>
            {cart.items.map(item => 
                <li key={item.item.id}>
                <div>
                    <Link to={`/product/${item.item.id}`}>
                    <img src={`${item.item.imageUrl}`} alt={item.item.name} />
                    </Link>
                </div>
                <div>
                    <Link to={`/product/${item.item.id}`}>
                        <p className={cartClass.name}>{item.item.name}</p>
                        <span className={cartClass.brand}>{item.item.brand}</span> 
                    </Link>
                </div>
                <div>
                    <button 
                        className={cartClass.quantityButton}
                        onClick={() => {
                            if (item.quantity > 1) {
                                changeQuantity(item, item.quantity - 1);
                            }
                        }}
                    >
                        -
                    </button>
                    <input
                        className={cartClass.quantityInput}
                        type="number"
                        min="1"
                        max={item.item.stock}
                        value={item.quantity}
                        onChange={(e) => {
                            const newQuantity = parseInt(e.target.value);
                            if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= item.item.stock) {
                                changeQuantity(item, newQuantity);
                            }
                        }}
                    />
                    <button 
                        className={cartClass.quantityButton}
                        onClick={() => {
                            if (item.quantity < item.item.stock) { // Verify if the quantity is less than the stock
                                changeQuantity(item, item.quantity + 1);
                            }
                        }}
                    >
                        +
                    </button>
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
            <div>
                <div className={cartClass.items_count}>{cart.cartCount}</div>
                <div className={cartClass.total_price}><Price price={cart.cartTotal} /></div>
            </div>
            <Link to="/checkout" className={cartClass.checkout_button}> Proceed to Checkout </Link>
        </div>
    </div>
    }
    </>
    )
}
