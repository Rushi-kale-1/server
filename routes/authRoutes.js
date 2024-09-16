const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user!' });
    }
});

// Signin route
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: 'Invalid credentials!' });
        req.logIn(user, (err) => {
            if (err) return next(err);
            res.status(200).json({ message: 'Logged in successfully!' });
        });
    })(req, res, next);
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logged out successfully!' });
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile'); // Redirect to a profile or home page
});

module.exports = router;
