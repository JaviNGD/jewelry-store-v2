import { Router } from 'express';
import { sample_users } from '../data.js';
import jwt from 'jsonwebtoken';
const router = Router();

// Define the /login route to handle POST requests to /login endpoint and return a token if the user is found 
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(
        user => user.email === email && user.password === password
    );

    // If user is found, return the user object with a token
    if (user) {
        res.send(generateTokenResponse(user));
        return;
    }

    // If user is not found, return an error message with status code 400
    res.status(400).send('Username or password is invalid');
});

const generateTokenResponse = user => {
    const token = jwt.sign(
        {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        },
        'secret',
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