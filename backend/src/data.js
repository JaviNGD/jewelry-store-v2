// Fake data for testing

export const sample_data = [{
    id: '1',
    name: 'Product 1',
    brand: 'Brand 1',
    description: 'Description 1',
    price: 100,
    favorite: false,
    imageUrl: 'placeholder-image-300x225.png',
    category: 'category1',
    stock: 10
}, {
    id: '2',
    name: 'Product 2',
    brand: 'Brand 2',
    description: 'Description 2',
    price: 200,
    favorite: true,
    imageUrl: 'placeholder-image-300x225.png',
    category: 'category2',
    stock: 100
}, {
    id: '3',
    name: 'Object 3',
    brand: 'Brand 3',
    description: 'Description 3',
    price: 300,
    favorite: true,
    imageUrl: 'A_black_image.jpg',
    category: 'category3',
    stock: 15
}, {
    id: '4',
    name: 'Object 4',
    brand: 'Brand 4',
    description: 'Description 4',
    price: 400,
    favorite: false,
    imageUrl: 'placeholder-image-300x225.png',
    category: 'category4',
    stock: 5
}]

export const sample_categories = [
    {name: 'All', count: 4},
    {name: 'category1', count: 1},
    {name: 'category2', count: 1},
    {name: 'category3', count: 1},
    {name: 'category4', count: 1}
]

export const sample_users = [{
    id: '1',
    name: 'User 1',
    email: 'test@example.com',
    address: 'Address 1',
    password: '123456',
    isAdmin: false
}, {
    id: '2',
    name: 'Admin',
    email: 'admin@example.com',
    address: 'Address 2',
    password: '123456',
    isAdmin: true
}]