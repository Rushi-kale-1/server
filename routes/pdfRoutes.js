const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Upload PDF route
router.post('/upload', upload.single('pdf'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded!' });
    res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
});

// Merge PDFs route (example placeholder)
router.post('/merge', (req, res) => {
    // Implement PDF merge functionality
    res.status(200).json({ message: 'PDFs merged successfully!' });
});

module.exports = router;
