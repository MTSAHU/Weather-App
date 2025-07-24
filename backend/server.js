// backend/server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');
const path = require('path'); 

const app = express();
app.use(cors());

// IMPORTANT: Use Heroku's dynamic PORT for cloud deployment
const PORT = process.env.PORT || 3000;

// --- THESE TWO BLOCKS ARE MISSING AND ARE ESSENTIAL FOR CLOUD DEPLOYMENT ---

// 1. Serve static files (like weather.js, style.css, images, etc.)
// This tells Express to look for static assets in the directory one level up
// from where server.js is located (your project's root directory).
app.use(express.static(path.join(__dirname, '..')));

// 2. Serve the main HTML file (index.html) for the root URL
// When someone visits your deployed app's URL (e.g., https://your-app.herokuapp.com/),
// this sends them your index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// --- END OF ESSENTIAL ADDITIONS ---


// Your existing API endpoint for weather data
app.get('/weather', async (req, res) => {
    const location = req.query.location;
    try {
        const response = await axios.get('https://yahoo-weather5.p.rapidapi.com/weather', {
            params: { location },
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data from Yahoo Weather API:', error.message);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: 'Failed to fetch weather data from external API.' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});