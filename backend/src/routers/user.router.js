import { Router } from 'express';
import { UserModel } from '../models/user.model.js';
import handler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = Router();

// Define the /login route to handle POST requests to /login endpoint and return a token if the user is found 
router.post('/login', handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    // If user is found, return the user object with a token
    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(generateTokenResponse(user));
        return;
    }

    // If user is not found, return an error message with status code 400
    res.status(400).send('Username or password is invalid');
}));

const generateTokenResponse = user => {
    const token = jwt.sign(
        {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
        expiresIn: '30d',
        }
    );

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token,
    };
};

export default router;