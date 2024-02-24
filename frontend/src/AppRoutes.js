import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import ItemPage from './pages/Item/ItemPage'

export default function AppRoutes() {
  return (
    // Define the routes for the application
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchTerm" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<HomePage />} />
        <Route path="/product/:itemId" element={<ItemPage />} />
    </Routes>
  )
}
