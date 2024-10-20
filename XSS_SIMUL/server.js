// const express = require('express');
// const path = require('path');
// const mysql = require('mysql2');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');

// // Set up session
// app.use(session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: true,
// }));

// // MySQL setup
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin',
//     database: 'cybersentinel'
// });

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Connected to MySQL');
// });

// // Middleware to check login
// function isLoggedIn(req, res, next) {
//     if (req.session.loggedIn) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// }

// // Login page route
// app.get('/', (req, res) => {
//     res.render('login');
// });

// // Post login route
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     if (username === 'admin' && password === 'password') {
//         req.session.loggedIn = true;
//         res.redirect('/comments');
//     } else {
//         res.render('login', { error: 'Invalid Credentials' });
//     }
// });

// // Comments page (after login)
// app.get('/comments', isLoggedIn, (req, res) => {
//     db.query('SELECT * FROM comments', (err, results) => {
//         if (err) throw err;
//         res.render('comments', { comments: results });
//     });
// });

// // Post new comment
// app.post('/comment', isLoggedIn, (req, res) => {
//     const comment = req.body.comment;
//     db.query('INSERT INTO comments (content) VALUES (?)', [comment], (err) => {
//         if (err) throw err;
//         res.redirect('/comments');
//     });
// });

// // Logout route
// app.get('/logout', isLoggedIn, (req, res) => {
//     req.session.destroy(() => {
//         res.redirect('/');
//     });
// });

// // Report route
// app.get('/report', isLoggedIn, (req, res) => {
//     res.render('report');
// });

// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });

const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

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
        res.redirect('/');
    }
}

// Login page route
app.get('/', (req, res) => {
    res.render('login');
});

// Post login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        req.session.loggedIn = true;
        req.session.username = username; // Store the username in the session
        res.redirect('/comments');
    } else {
        res.render('login', { error: 'Invalid Credentials' });
    }
});

// Comments page (after login)
app.get('/comments', isLoggedIn, (req, res) => {
    db.query('SELECT * FROM comments ORDER BY created_at DESC', (err, results) => {
        if (err) throw err;
        res.render('comments', { comments: results });
    });
});

// Post new comment
app.post('/comment', isLoggedIn, (req, res) => {
    const comment = req.body.comment;
    const username = req.session.username; // Get username from session

    // Insert comment with username
    // To this
    db.query('INSERT INTO comments (content, username) VALUES (?, ?)', [comment, username], (err) => {
        if (err) throw err;
        res.redirect('/comments');
    });
});

// Logout route
app.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Report route
app.get('/report', isLoggedIn, (req, res) => {
    res.render('report');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
