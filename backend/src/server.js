import express from 'express';
import cors from 'cors';
import productRouter from './routers/product.router.js';
import userRouter from './routers/user.router.js';

const app = express();

app.use(express.json()); 

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});