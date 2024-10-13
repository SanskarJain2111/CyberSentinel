import express from 'express';
import mongoose from 'mongoose';
import templateRoutes from './routes/templateRoutes.js';

const app = express();

app.use(express.static('public'));

app.use('/api/template', templateRoutes);

mongoose.connect('mongodb://localhost:27017/phishing-simulation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

