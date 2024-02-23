import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'

export default function AppRoutes() {
  return (
    // Define the routes for the application
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchTerm" element={<HomePage />} />
    </Routes>
  )
}
