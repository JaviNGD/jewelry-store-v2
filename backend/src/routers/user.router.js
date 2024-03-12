import { Router } from 'express';
import { UserModel } from '../models/user.model.js';
import handler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.mid.js';

const PASSWORD_HASH_SALT_ROUNDS = 10;
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

// Define the /register route to handle POST requests to /register endpoint and return a token if the user is created
router.post('/register', handler(async (req, res) => {
    const { name, email, address, password} = req.body;
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        res.status(400).send('User already exists');
        return;
    } 

    const newUser = {
        name,
        email: email.toLowerCase(),
        address,
        password: await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS),
    };

    const createdUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(createdUser));
}));

// updateProfile route to handle PUT requests to /updateProfile endpoint and return a token if the user is updated
router.put('/updateProfile', auth, handler(async (req, res) => {
    const { name , address } = req.body;
    const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { name , address },
        { new: true}
    );

    res.send(generateTokenResponse(user));
}));

// changePassword route to handle PUT requests to /changePassword endpoint
router.put(
    '/changePassword',
    auth,
    handler(async (req, res) => {
        const { currentPassword, newPassword } = req.body;
        const user = await UserModel.findById(req.user.id);
    
        // If user is not found, return an error message with status code 400
        if (!user) {
            res.status(400).send('Change Password Failed!');
            return;
        }
        
        // If user is found, compare the current password with the password in the database
        const equal = await bcrypt.compare(currentPassword, user.password);
    
        // If the passwords do not match, return an error message with status code 400
        if (!equal) {
            res.status(400).send('Current Password Is Not Correct!');
            return;
        }
        
        // If the passwords do match, hash the new password and save it to the database
        user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
        await user.save();
    
        res.send();
        })
);

// generateTokenResponse function to generate a token for a user
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