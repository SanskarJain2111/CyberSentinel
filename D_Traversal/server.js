const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home page
app.get('/', (req, res) => {
    res.render('index');
});

// Handle file viewing
// Handle file viewing
app.post('/view-file', (req, res) => {
    const filePath = path.join(__dirname, 'files', req.body.filePath);
    
    // Security check to prevent malicious path traversal
    if (filePath.includes('../')) {
        return res.send("Access Denied: Invalid path.");
    }

    // Attempt to read the file
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.send("Error: Unable to access file.");
        }
        // Render the file content in an EJS view
        res.render('view-file', { fileContent: data });  // Updated line
    });
});


// Generate report
app.get('/generate-report', (req, res) => {
    res.render('report');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
