import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import ItemPage from './pages/Item/ItemPage';
import CartPage from './pages/Cart/CartPage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import AuthRoute from './components/AuthRoute/AuthRoute';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import ProfilePage from './pages/Profile/ProfilePage';

export default function AppRoutes() {
  return (
    // Define the routes for the application
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchTerm" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<HomePage />} />
        <Route path="/product/:itemId" element={<ItemPage />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/checkout"
          element={
            <AuthRoute>
              <CheckoutPage />
            </AuthRoute>
          }
        />
        <Route path='/profile' element={<ProfilePage />} />
    </Routes>
  )
}
