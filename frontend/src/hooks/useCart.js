import React, { useContext, useEffect } from 'react'

// Create a context for the cart
const CartContext = React.createContext(null)

// Define the cart provider 
// CART_KEY is the key for the cart in the local storage and EMPTY_CART is the initial value for the cart
const CART_KEY = 'cart';
const EMPTY_CART = {items: [], cartTotal: 0, cartCount: 0};

export default function CartProvider({ children }) {

    // Get the cart from the local storage
    const initCart = getCartFromLocalStorage();

    // Define the state for the cart
    // The cart will be an array of items, each with a quantity and price
    const [cartItems, setCartItems] = React.useState(initCart.items);

    // Calculate the total price and the total number of items in the cart
    const [cartTotal, setCartTotal] = React.useState(initCart.cartTotal);
    const [cartCount, setCartCount] = React.useState(initCart.cartCount);

    // Update the total price and the total number of items in the cart
    useEffect(() => {
       const totalPrice = sum(cartItems.map(item => item.price));
       const totalCount = sum(cartItems.map(item => item.quantity));

        setCartTotal(totalPrice);
        setCartCount(totalCount);

        // Save the cart to the local storage
        localStorage.setItem(CART_KEY, JSON.stringify({
          items: cartItems,
          cartTotal: totalPrice,
          cartCount: totalCount
        }));
    }, [cartItems]);

    // Save the cart to the local storage
    function getCartFromLocalStorage() {
        const storedCart = localStorage.getItem(CART_KEY);
        return storedCart? JSON.parse(storedCart) : EMPTY_CART;
    }

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

    // Update the cart items
    setCartItems(
      cartItems.map(item => 
        item.item.id === changedCartItem.item.id ? changedCartItem : item
      )
    );
  };

  // Add an item to the cart
  const addToCart = item => {
    // Check if the item is already in the cart
    const cartItem = cartItems.find(cartItem => cartItem.item.id === item.id);

    // If the item is already in the cart, increase the quantity else add the item to the cart
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + 1);
    } else {
      setCartItems([...cartItems, {item, quantity: 1, price: item.price}]);
    }
  }

  return (
    // Provide the cart context to the children
    <CartContext.Provider 
    value={{
      cart:{items:cartItems, cartTotal, cartCount},
      removeFromCart,
      changeQuantity,
      addToCart
    }}>
        { children }
    </CartContext.Provider> 
  )
}

export const useCart = () => useContext(CartContext)