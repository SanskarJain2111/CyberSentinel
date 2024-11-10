// import express from 'express';
// import path from 'path';
// import mysql from 'mysql2';
// import session from 'express-session';
// import bodyParser from 'body-parser';
// import fs from 'fs';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// import templateRoutes from './phishing_Simulation/routes/templateRoutes.js'; // Adjust to your actual path

// const app = express();

// // Set up view engine
// app.set('view engine', 'ejs');

// // Body parser for handling form data
// app.use(bodyParser.urlencoded({ extended: false }));

// // Serve static files (CSS, images, etc.)
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static(path.join(__dirname, 'css')));
// app.use('/phishing_Simulation', express.static(path.join(__dirname, 'phishing_Simulation/public')));
// app.use('/XSS_SIMUL/public', express.static(path.join(__dirname, 'XSS_SIMUL/public')));
// app.use('/D_Traversal/public', express.static(path.join(__dirname, 'D_Traversal/public')));
// app.use('/SQLSimulation/public', express.static(path.join(__dirname, 'SQLSimulation/public'))); // SQL Simulation static files

// // Use phishing simulation routes
// app.use('/api/template', templateRoutes);

// // Set up session
// app.use(session({
//     secret: 'secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { maxAge: 60000 }, // Set session expiration to 1 minute
// }));

// // MySQL setup for both databases
// const mainDb = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'sans21',
//     database: 'cybersentinel',
// });

// const vulnerableDb = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'sans21',
//     database: 'vulnerable_db',
// });

// // Connect to databases
// mainDb.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to cybersentinel MySQL database');
// });

// vulnerableDb.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to vulnerable_db MySQL database');
// });

// // Middleware for XSS simulation login check
// function isLoggedIn(req, res, next) {
//     if (req.session.loggedIn) {
//         next();
//     } else {
//         res.redirect('/XSS_SIMUL/login');
//     }
// }

// // Main site pages
// app.get('/', (req, res) => {
//     res.render('home'); // Renders 'home.ejs'
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

// // XSS Simulation Routes
// const xssViewsDir = path.join(__dirname, 'XSS_SIMUL/views');

// app.get('/XSS_SIMUL/login', (req, res) => {
//     res.render(path.join(xssViewsDir, 'login'));
// });

// app.get('/XSS_SIMUL/comments', isLoggedIn, (req, res) => {
//     mainDb.query('SELECT * FROM comments ORDER BY created_at DESC', (err, results) => {
//         if (err) throw err;
//         res.render(path.join(xssViewsDir, 'comments'), { comments: results });
//     });
// });

// app.get('/XSS_SIMUL/report', isLoggedIn, (req, res) => {
//     res.render(path.join(xssViewsDir, 'report'));
// });

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     if (username === 'admin' && password === 'password') {
//         req.session.loggedIn = true;
//         req.session.username = username;
//         res.redirect('/XSS_SIMUL/comments');
//     } else {
//         res.render(path.join(xssViewsDir, 'login'), { error: 'Invalid Credentials' });
//     }
// });

// app.post('/XSS_SIMUL/comment', isLoggedIn, (req, res) => {
//     const comment = req.body.comment;
//     const username = req.session.username;

//     mainDb.query('INSERT INTO comments (content, username) VALUES (?, ?)', [comment, username], (err) => {
//         if (err) throw err;
//         res.redirect('/XSS_SIMUL/comments');
//     });
// });

// app.get('/logout', isLoggedIn, (req, res) => {
//     req.session.destroy(() => {
//         res.redirect('/XSS_SIMUL/login');
//     });
// });

// // Directory Traversal Simulation Routes
// const dTraversalViewsDir = path.join(__dirname, 'D_Traversal/views');

// app.get('/D_Traversal/index', (req, res) => {
//     res.render(path.join(dTraversalViewsDir, 'index'));
// });

// app.post('/D_Traversal/view-file', (req, res) => {
//     const filePath = path.join(__dirname, 'D_Traversal/files', req.body.filePath);

//     if (filePath.includes('../')) {
//         return res.send("Access Denied: Invalid path.");
//     }

//     fs.readFile(filePath, 'utf-8', (err, data) => {
//         if (err) {
//             return res.send("Error: Unable to access file.");
//         }
//         res.render(path.join(dTraversalViewsDir, 'view-file'), { fileContent: data });
//     });
// });

// app.get('/D_Traversal/report', (req, res) => {
//     res.render(path.join(dTraversalViewsDir, 'report'));
// });

// // SQL Injection Simulation Routes
// const sqlViewsDir = path.join(__dirname, 'SQLSimulation/views');

// app.get('/SQLSimulation/index', (req, res) => {
//     res.render(path.join(sqlViewsDir, 'index'));
// });

// app.post('/SQLSimulation/login', (req, res) => {
//     const { username, password } = req.body;
//     const timestamp = new Date().toLocaleString();
//     req.session.user_actions = [
//         `User entered username: '${username}' at ${timestamp}`,
//         `User entered password: '${password}' at ${timestamp}`,
//         `User clicked 'Sign In' at ${timestamp}`,
//     ];

//     const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
//     vulnerableDb.query(sql, [username, password], (err, result) => {
//         if (err) throw err;

//         req.session.report_data = { username, password, timestamp, user_actions: req.session.user_actions };

//         if (result.length > 0) {
//             req.session.message = 'Login successful.';
//             res.redirect('/SQLSimulation/report');
//         } else {
//             req.session.message = 'Login failed. Please recheck your credentials and try again.';
//             res.redirect('/SQLSimulation/report');
//         }
//     });
// });

// app.get('/SQLSimulation/report', (req, res) => {
//     if (!req.session.report_data) {
//         return res.redirect('/SQLSimulation/index');
//     }
//     res.render(path.join(sqlViewsDir, 'report'), { message: req.session.message, data: req.session.report_data });
// });

// app.post('/SQLSimulation/report_spam', (req, res) => {
//     const timestamp = new Date().toLocaleString();
//     req.session.spam_report_actions = [`User clicked 'Report as Spam' at ${timestamp}`];
//     res.redirect('/SQLSimulation/spam_report');
// });

// app.get('/SQLSimulation/spam_report', (req, res) => {
//     if (!req.session.spam_report_actions) {
//         return res.redirect('/SQLSimulation/index');
//     }
//     const message = 'Congratulations! You have identified this as a vulnerable website.';
//     const user_actions = req.session.spam_report_actions;
//     res.render(path.join(sqlViewsDir, 'spam_report'), { message, user_actions });
// });

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });













// Import necessary modules
import express from 'express';
import path from 'path';
import mysql from 'mysql2';
import session from 'express-session';
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Define __filename and __dirname for module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import phishing simulation routes
import templateRoutes from './phishing_Simulation/routes/templateRoutes.js';

const app = express();

// Set up view engine
app.set('view engine', 'ejs');

// Body parser for handling form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/phishing_Simulation', express.static(path.join(__dirname, 'phishing_Simulation/public')));
app.use('/XSS_SIMUL/public', express.static(path.join(__dirname, 'XSS_SIMUL/public')));
app.use('/D_Traversal/public', express.static(path.join(__dirname, 'D_Traversal/public')));
app.use('/SQLSimulation/public', express.static(path.join(__dirname, 'SQLSimulation/public')));

// Use phishing simulation routes
app.use('/api/template', templateRoutes);

// Set up session with longer expiration (5 minutes for testing)
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60000 }, // 5 minutes
}));

// MySQL setup for both databases
const mainDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sans21',
    database: 'cybersentinel',
});

const vulnerableDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sans21',
    database: 'vulnerable_db',
});

// Connect to databases
mainDb.connect((err) => {
    if (err) console.error('Error connecting to cybersentinel MySQL database:', err);
    else console.log('Connected to cybersentinel MySQL database');
});

vulnerableDb.connect((err) => {
    if (err) console.error('Error connecting to vulnerable_db MySQL database:', err);
    else console.log('Connected to vulnerable_db MySQL database');
});

// Middleware for login check (used in XSS simulation)
function isLoggedIn(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/XSS_SIMUL/login');
    }
}

// Main site pages
app.get('/', (req, res) => res.render('home'));
app.get('/phishingInfo', (req, res) => res.render('phishingInfo'));
app.get('/sqlInfo', (req, res) => res.render('sqlInfo'));
app.get('/directoryInfo', (req, res) => res.render('directoryInfo'));
app.get('/xssInfo', (req, res) => res.render('xssInfo'));

// XSS Simulation Routes
const xssViewsDir = path.join(__dirname, 'XSS_SIMUL/views');

app.get('/XSS_SIMUL/login', (req, res) => res.render(path.join(xssViewsDir, 'login')));

app.get('/XSS_SIMUL/comments', isLoggedIn, (req, res) => {
    mainDb.query('SELECT * FROM comments ORDER BY created_at DESC', (err, results) => {
        if (err) return res.status(500).send("Database error.");
        res.render(path.join(xssViewsDir, 'comments'), { comments: results });
    });
});

app.get('/XSS_SIMUL/report', isLoggedIn, (req, res) => res.render(path.join(xssViewsDir, 'report')));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/XSS_SIMUL/comments');
    } else {
        res.render(path.join(xssViewsDir, 'login'), { error: 'Invalid Credentials' });
    }
});

app.post('/XSS_SIMUL/comment', isLoggedIn, (req, res) => {
    const comment = req.body.comment;
    const username = req.session.username;

    mainDb.query('INSERT INTO comments (content, username) VALUES (?, ?)', [comment, username], (err) => {
        if (err) return res.status(500).send("Error saving comment.");
        res.redirect('/XSS_SIMUL/comments');
    });
});

app.get('/logout', isLoggedIn, (req, res) => {
    req.session.destroy(() => res.redirect('/XSS_SIMUL/login'));
});

// Directory Traversal Simulation Routes
const dTraversalViewsDir = path.join(__dirname, 'D_Traversal/views');

app.get('/D_Traversal/index', (req, res) => res.render(path.join(dTraversalViewsDir, 'index')));

app.post('/D_Traversal/view-file', (req, res) => {
    const filePath = path.normalize(path.join(__dirname, 'D_Traversal/files', req.body.filePath));

    if (!filePath.startsWith(path.join(__dirname, 'D_Traversal/files'))) {
        return res.status(400).send("Access Denied: Invalid path.");
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).send("Error accessing file.");
        res.render(path.join(dTraversalViewsDir, 'view-file'), { fileContent: data });
    });
});

app.get('/D_Traversal/report', (req, res) => res.render(path.join(dTraversalViewsDir, 'report')));

// SQL Injection Simulation Routes
const sqlViewsDir = path.join(__dirname, 'SQLSimulation/views');

app.get('/SQLSimulation/index', (req, res) => res.render(path.join(sqlViewsDir, 'index')));

app.post('/SQLSimulation/login', (req, res) => {
    const { username, password } = req.body;
    const timestamp = new Date().toLocaleString();
    req.session.user_actions = [
        `User entered username: '${username}' at ${timestamp}`,
        `User entered password: '${password}' at ${timestamp}`,
        `User clicked 'Sign In' at ${timestamp}`,
    ];

    // Intentional SQL Injection vulnerability for demonstration purposes
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    vulnerableDb.query(sql, (err, result) => {
        if (err) return res.status(500).send("Database error.");

        req.session.report_data = { username, password, timestamp, user_actions: req.session.user_actions };

        if (result.length > 0) {
            req.session.message = 'Login successful.';
            res.redirect('/SQLSimulation/report');
        } else {
            req.session.message = 'Login failed. Please recheck your credentials and try again.';
            res.redirect('/SQLSimulation/report');
        }
    });
});

app.get('/SQLSimulation/report', (req, res) => {
    if (!req.session.report_data) return res.redirect('/SQLSimulation/index');
    res.render(path.join(sqlViewsDir, 'report'), { message: req.session.message, data: req.session.report_data });
});

app.post('/SQLSimulation/report_spam', (req, res) => {
    const timestamp = new Date().toLocaleString();
    req.session.spam_report_actions = [`User clicked 'Report as Spam' at ${timestamp}`];
    res.redirect('/SQLSimulation/spam_report');
});

app.get('/SQLSimulation/spam_report', (req, res) => {
    if (!req.session.spam_report_actions) return res.redirect('/SQLSimulation/index');
    const message = 'Congratulations! You have identified this as a vulnerable website.';
    const user_actions = req.session.spam_report_actions;
    res.render(path.join(sqlViewsDir, 'spam_report'), { message, user_actions });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
