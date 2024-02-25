import React, { useContext, useEffect } from 'react'
import { sample_data } from '../data';

// Create a context for the cart
const CartContext = React.createContext(null)

export default function CartProvider({ children }) {

    // Fake data for testing

    // Define the state for the cart
    // The cart will be an array of items, each with a quantity and price
    const [cartItems, setCartItems] = React.useState(
        sample_data
        .slice(1, 3)
        .map(item => ({item, quantity: 1, price: item.price}))
      );

    // Calculate the total price and the total number of items in the cart
    const [cartTotal, setCartTotal] = React.useState(0);
    const [cartCount, setCartCount] = React.useState(0);

    // Update the total price and the total number of items in the cart
    useEffect(() => {
       const totalPrice = sum(cartItems.map(item => item.price));
       const totalCount = sum(cartItems.map(item => item.quantity));

        setCartTotal(totalPrice);
        setCartCount(totalCount);
    }, [cartItems]);

    // Calculate the total price and the total number of items in the cart
    // preValue is the accumulated value, curValue is the current value
    const sum = items => {
      return items.reduce((preValue, curValue) => preValue + curValue, 0);
    }

    // Remove an item from the cart by its productId 
    const removeFromCart = (productId) => {
      const filteredItems = cartItems.filter(item => item.item.id !== productId);
      setCartItems(filteredItems);
    };

    // Change the quantity and total price of an item in the cart 
    const changeQuantity = (cartItem, newQuantity) => {
      const {item} = cartItem;
      const changedCartItem = {
        ...cartItem,
        quantity: newQuantity,
        price: item.price * newQuantity
    };

    setCartItems(
      cartItems.map(item => 
        item.item.id === changedCartItem.item.id ? changedCartItem : item
      )
    );
  };

  return (
    // Provide the cart context to the children
    <CartContext.Provider 
    value={{
      cart:{items:cartItems, cartTotal, cartCount},
      removeFromCart,
      changeQuantity
    }}>
        { children }
    </CartContext.Provider> 
  )
}

export const useCart = () => useContext(CartContext)