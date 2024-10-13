import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const __dirname = path.resolve();

router.get('/random', (req, res) => {
    const templatesDir = path.join(__dirname, '/phishing_Simulation/public/templates');

    fs.readdir(templatesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading template directory');
        }

        const htmlFiles = files.filter(file => file.endsWith('.html'));

        if (htmlFiles.length === 0) {
            return res.status(404).send('No templates found');
        }

        const randomTemplate = htmlFiles[Math.floor(Math.random() * htmlFiles.length)];
        const templatePath = path.join(templatesDir, randomTemplate);

        res.sendFile(templatePath);
    });
});

export default router;

