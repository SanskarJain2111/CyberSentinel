// const express = require('express');
// const app = express();
// const path = require('path');
// import templateRoutes from './phishing_Simulation/routes/templateRoutes.js';

// // Set the view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Serve static files like CSS and images
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/css', express.static(path.join(__dirname, 'css')));

// app.use('/phishing_Simulation', express.static(path.join(__dirname, 'phishing_Simulation/public')));

// // Use phishing simulation routes
// app.use('/api/template', templateRoutes);

// // Routes
// app.get('/', (req, res) => {
//     res.render('home');
// });

// app.get('/phishingInfo', (req, res) => {
//     res.render('phishingInfo');
// });

// app.get('/sqlInfo', (req, res) => {
//     res.render('sqlInfo');
// });

// app.get('/directoryInfo', (req, res) => {
//     res.render('directoryInfo');
// });

// app.get('/xssInfo', (req, res) => {
//     res.render('xssInfo');
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


import express from 'express';
import path from 'path';
import templateRoutes from './phishing_Simulation/routes/templateRoutes.js';

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views')); // Use process.cwd() for correct path resolution

// Serve static files like CSS and images
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/css', express.static(path.join(process.cwd(), 'css')));

app.use('/phishing_Simulation', express.static(path.join(process.cwd(), 'phishing_Simulation/public')));

// Use phishing simulation routes
app.use('/api/template', templateRoutes);

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/phishingInfo', (req, res) => {
    res.render('phishingInfo');
});

app.get('/sqlInfo', (req, res) => {
    res.render('sqlInfo');
});

app.get('/directoryInfo', (req, res) => {
    res.render('directoryInfo');
});

app.get('/xssInfo', (req, res) => {
    res.render('xssInfo');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
