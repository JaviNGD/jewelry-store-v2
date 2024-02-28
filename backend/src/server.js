import express from 'express';
import cors from 'cors';
import productRouter from './routers/product.router.js';

const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));

app.use('/api/products', productRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});