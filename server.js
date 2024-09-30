const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?category=technology&apiKey=2a893056950d47ceae949c75eb7253a3';

app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(NEWS_API_URL);
        const articles = response.data.articles;

        let html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="styles4.css"> <!-- Link to CSS -->
                <title>Cybersecurity News</title>
            </head>
            <body>
                <h2>Latest Cybersecurity News</h2>
                <ul>`;

        articles.forEach(article => {
            html += `<li><a href="${article.url}" target="_blank">${article.title}</a> - ${article.source.name}</li>`;
        });

        html += `
                </ul>
            </body>
            </html>`;
        
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching the latest updates');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
