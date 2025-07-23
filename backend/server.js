const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

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
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});