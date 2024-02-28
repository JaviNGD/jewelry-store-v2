import { Router } from "express";
import { sample_data, sample_categories } from "../data.js";

const router = Router();

router.get("/", (req, res) => {
    res.send(sample_data);
});

router.get("/categories", (req, res) => {
    res.send(sample_categories);
});

router.get('/search/:searchTerm', (req, res) => {
    const {searchTerm} = req.params;
    const products = sample_data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.send(products);
});

router.get('/category/:categoryName', (req, res) => {
    const {categoryName} = req.params;
    if (categoryName === 'All') {
        res.send(sample_data);
    } else {
        const products = sample_data.filter(item => item.category?.includes(categoryName));
        res.send(products);
    }
});

router.get('/:itemId', (req, res) => {
    const {itemId} = req.params;
    const product = sample_data.find(item => item.id === itemId);
    res.send(product);
});

export default router;