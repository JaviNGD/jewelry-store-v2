import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import handler from 'express-async-handler';

const router = Router();

router.get("/", handler(async (req, res) => {
    const products = await ProductModel.find({});
    res.send(products);
}));

router.get("/categories", handler(async (req, res) => {
    const categories = await ProductModel.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                name: "$_id",
                count: 1
            }
        }
    ]);

    // Sort the categories by name
    const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));

    // Add an "All" category
    const all = {
        name: "All",
        count: await ProductModel.countDocuments()
    };

    // Add the "All" category to the beginning of the list
    sortedCategories.unshift(all);

    res.send(sortedCategories);
}));

router.get('/search/:searchTerm', handler(async (req, res) => {
    const {searchTerm} = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const products = await ProductModel.find({
        $or: [
            {name: searchRegex},
            {brand: searchRegex}
        ]
    });
    
    res.send(products);
}));

router.get('/category/:categoryName', handler(async (req, res) => {
    const {categoryName} = req.params;
    const products = await ProductModel.find({category: categoryName});
    res.send(products);
}));

router.get('/:itemId', handler(async (req, res) => {
    const {itemId} = req.params;
    const product = await ProductModel.findById(itemId);
    res.send(product);
}));

export default router;