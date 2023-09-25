const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Student = require('../Model/Student.Model');

// Student Registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists in the database
    Student.findOne({ username }, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        // Create a new user
        const newUser = new Student({ username, password });

        // Save the new user to the database
        newUser.save((err) => {
            if (err) {
                return res.status(500).json({ message: 'Registration failed' });
            }
            res.status(201).json({ message: 'Registration successful' });
        });
    });
});

// Student Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists in the database
    Student.findOne({ username }, (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Generate a JWT token
        const token = jwt.sign({ username }, config.secret, { expiresIn: '1h' });

        res.status(200).json({ auth: true, token });
    });
});

// Student Logout
router.get('/logout', (req, res) => {
    // Implement user logout logic here, if needed
    res.status(200).json({ auth: false, token: null });
});

module.exports = router;
