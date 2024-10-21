// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const mysql = require('mysql2');
// const path = require('path');
// const app = express();
// const port = 3000;

// // Configure the session middleware
// app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 } // 1-minute session expiration for security
// }));

// // Set up body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Set EJS as the templating engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // MySQL connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'sans21', // Set your password here
//     database: 'vulnerable_db'
// });

// // Connect to MySQL database
// db.connect(err => {
//     if (err) throw err;
//     console.log('MySQL connected...');
// });

// // Home route
// app.get('/', (req, res) => {
//     res.render('index');
// });

// // Login handling
// // Login handling with security tips
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const timestamp = new Date().toLocaleString();
//     req.session.user_actions = [];

//     req.session.user_actions.push(`User entered username: '${username}' at ${timestamp}`);
//     req.session.user_actions.push(`User entered password: '${password}' at ${timestamp}`);
//     req.session.user_actions.push(`User clicked 'Sign In' at ${timestamp}`);

//     const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
//     db.query(sql, [username, password], (err, result) => {
//         if (err) throw err;

//         req.session.report_data = {
//             username,
//             password,
//             timestamp,
//             user_actions: req.session.user_actions,
//         };

//         if (result.length > 0) {
//             req.session.message = `
//                 LOGIN SUCCESSFUL. Security warnings: This site is vulnerable to SQL injection attacks. 
//                 Please be cautious when entering your credentials on any website. Verify that you are on a 
//                 genuine site before entering your personal information like your credentials. Security Tips: 
//                 1) Always check the website URL for correctness 
//                 2) Look for HTTPS in the URL 
//                 3) Avoid entering sensitive information on unfamiliar sites 
//                 4) Regularly update your passwords and enable two-factor authentication where possible!
//             `;
//             res.redirect('/report');
//         } else {
//             req.session.message = 'Login failed. Please recheck your credentials and try again.';
//             res.redirect('/report');
//         }
//     });
// });

// // Report handling
// app.get('/report', (req, res) => {
//     if (!req.session.report_data) {
//         return res.redirect('/');
//     }
//     res.render('report', { message: req.session.message, data: req.session.report_data });
// });

// // Spam report handling
// app.post('/report_spam', (req, res) => {
//     const timestamp = new Date().toLocaleString();
//     req.session.spam_report_actions = [`User clicked 'Report as Spam' at ${timestamp}`];
//     res.redirect('/spam_report');
// });

// // Spam report view
// app.get('/spam_report', (req, res) => {
//     if (!req.session.spam_report_actions) {
//         return res.redirect('/');
//     }
//     const message = 'Congratulations! You have identified this as a vulnerable website.';
//     const user_actions = req.session.spam_report_actions;
//     res.render('spam_report', { message, user_actions });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Configure the session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } // 1-minute session expiration for security
}));

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sans21', // Set your password here
    database: 'vulnerable_db'
});

// Connect to MySQL database
db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// Login handling
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const timestamp = new Date().toLocaleString();
    req.session.user_actions = [];

    req.session.user_actions.push(`User entered username: '${username}' at ${timestamp}`);
    req.session.user_actions.push(`User entered password: '${password}' at ${timestamp}`);
    req.session.user_actions.push(`User clicked 'Sign In' at ${timestamp}`);

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) throw err;

        req.session.report_data = {
            username,
            password,
            timestamp,
            user_actions: req.session.user_actions,
        };

        if (result.length > 0) {
            req.session.message = 'Login successful.';
            res.redirect('/report');
        } else {
            req.session.message = 'Login failed. Please recheck your credentials and try again.';
            res.redirect('/report');
        }
    });
});

// Report handling
app.get('/report', (req, res) => {
    if (!req.session.report_data) {
        return res.redirect('/');
    }
    res.render('report', { message: req.session.message, data: req.session.report_data });
});

// Spam report handling
app.post('/report_spam', (req, res) => {
    const timestamp = new Date().toLocaleString();
    req.session.spam_report_actions = [`User clicked 'Report as Spam' at ${timestamp}`];
    res.redirect('/spam_report');
});

// Spam report view
app.get('/spam_report', (req, res) => {
    if (!req.session.spam_report_actions) {
        return res.redirect('/');
    }
    const message = 'Congratulations! You have identified this as a vulnerable website.';
    const user_actions = req.session.spam_report_actions;
    res.render('spam_report', { message, user_actions });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
