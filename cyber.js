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


// import express from 'express';
// import path from 'path';
// import templateRoutes from './phishing_Simulation/routes/templateRoutes.js';

// const app = express();

// // Set the view engine to EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(process.cwd(), 'views')); // Use process.cwd() for correct path resolution

// // Serve static files like CSS and images
// app.use(express.static(path.join(process.cwd(), 'public')));

// app.use('/css', express.static(path.join(process.cwd(), 'css')));

// app.use('/phishing_Simulation', express.static(path.join(process.cwd(), 'phishing_Simulation/public')));

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
import mysql from 'mysql2';
import session from 'express-session';
import bodyParser from 'body-parser';
import templateRoutes from './phishing_Simulation/routes/templateRoutes.js'; // Adjust to your actual path

const app = express();

// Set the default views directory globally
const defaultViewsDir = path.join(path.resolve(), 'views');
app.set('view engine', 'ejs');
app.set('views', defaultViewsDir);

// Body parser for handling form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/css', express.static(path.join(path.resolve(), 'css')));
app.use('/phishing_Simulation', express.static(path.join(path.resolve(), 'phishing_Simulation/public')));

// Serve static files for XSS Simulation
app.use('/XSS_SIMUL/public', express.static(path.join(path.resolve(), 'XSS_SIMUL/public')));

// Use phishing simulation routes
app.use('/api/template', templateRoutes);

// Set up session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

// MySQL setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sans21',
    database: 'cybersentinel'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL');
});

// Middleware to check login
function isLoggedIn(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/XSS_SIMUL/login'); // Redirect to login page if not logged in
    }
}

// Main site pages routes
app.get('/', (req, res) => {
    res.render('home'); // This will look in the default views directory
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

// XSS Simulation Routes
const xssViewsDir = path.join(path.resolve(), 'XSS_SIMUL/views');

app.get('/XSS_SIMUL/login', (req, res) => {
    res.render(path.join(xssViewsDir, 'login')); // Directly render login view
});

app.get('/XSS_SIMUL/comments', isLoggedIn, (req, res) => {
    db.query('SELECT * FROM comments ORDER BY created_at DESC', (err, results) => {
        if (err) throw err;
        res.render(path.join(xssViewsDir, 'comments'), { comments: results }); // Render comments view
    });
});

app.get('/XSS_SIMUL/report', isLoggedIn, (req, res) => {
    res.render(path.join(xssViewsDir, 'report')); // Render report view
});

// Post login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        req.session.loggedIn = true;
        req.session.username = username; // Store the username in the session
        res.redirect('/XSS_SIMUL/comments');
    } else {
        res.render(path.join(xssViewsDir, 'login'), { error: 'Invalid Credentials' }); // Show error on login failure
    }
});

// Post new comment
app.post('/XSS_SIMUL/comment', isLoggedIn, (req, res) => {
    const comment = req.body.comment;
    const username = req.session.username; // Get username from session

    db.query('INSERT INTO comments (content, username) VALUES (?, ?)', [comment, username], (err) => {
        if (err) throw err;
        res.redirect('/XSS_SIMUL/comments');
    });
});

// Logout route
app.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy(() => {
        res.redirect('/XSS_SIMUL/login'); // Redirect to login after logout
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
