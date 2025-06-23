const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// NASA API key - we will use the DEMO_KEY for now
const NASA_API_KEY = 'DEMO_KEY';

// Test route to make sure the server works
app.get('/', (req, res) => {
    res.send('NASA Space App Backend');
});

// Route to get Astronomy Picture of the Day (APOD)
app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching APOD:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from NASA API' });
    }
});

// Mars Rover Photos Route with query parameters
app.get('/mars-photos', async (req, res) => {
    const { rover = 'curiosity', sol = 1000, camera } = req.query;

    try {
        const nasaApiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

        const params = {
            sol,
            api_key: NASA_API_KEY,
        };

        if (camera) {
            params.camera = camera;
        }

        const response = await axios.get(nasaApiUrl, { params });
        res.json(response.data.photos);
    } catch (error) {
        console.error('Error fetching Mars Rover Photos:', error.message);
        res.status(500).json({ error: 'Failed to fetch Mars Rover Photos' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
