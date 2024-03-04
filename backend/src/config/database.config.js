import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { ProductModel } from "../models/product.model.js";
import { sample_users } from "../data.js";
import { sample_data } from "../data.js";
import bcrypt from "bcryptjs";

// The number of salt rounds to use when hashing the password
const PASSWORD_HASH_SALT_ROUNDS = 10;

// Use the schema of the model strictly, so that the model will not accept fields that are not defined in the schema
set('strictQuery', true);

// Connect to the database
export const connectDatabase = async () => {
    try {
        connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await seedUsers();
        await seedProducts();
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection error:', error);
    }
}

// Seed the database with sample data
async function seedUsers() {
    // Check if users already exist in the database
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0){
        console.log('Users already seeded');
        return;

    } else {
        // Hash the passwords and create the users
        for (let user of sample_users) {
            const hashedPassword = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
            user.password = hashedPassword;
            await UserModel.create(user);
        }
        console.log('Users seeded');  
    }
}

// Seed the database with sample data
export const seedProducts = async () => {
    // Check if products already exist in the database
    const products = await ProductModel.countDocuments();
    if (products > 0){
        console.log('Products already seeded');
        return;

    } else {
        // Create the sample products in the database 
        for (const product of sample_data) {
            product.imageUrl = `products/${product.imageUrl}`;
            await ProductModel.create(product);
        }
        console.log('Products seeded');
    }
}


