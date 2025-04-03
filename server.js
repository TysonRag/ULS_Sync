<<<<<<< HEAD
// Import necessary packages
const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = 3000;

// Path to the CSV file stored in the 'data' folder
const csvFilePath = 'C:\\Users\\tyson\\ULS_Sync\\Data\\vendor_data.csv';


// Middleware to serve static files (optional, for serving front-end assets like CSS/JS)
app.use(express.static('public'));

// Endpoint to get the CSV data
app.get('/get-vendor-data', (req, res) => {
    const results = [];

    // Read the CSV file and parse it
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Send the CSV data as a response
            res.json(results);
        })
        .on('error', (err) => {
            // If there's an error, send the error as a response
            res.status(500).send('Error reading CSV file');
        });
=======
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all requests
app.use(cors());  // You can also specify specific origins here if needed

// Middleware to parse JSON bodies
app.use(express.json());

// Handle OPTIONS requests for preflight checks
app.options('*', cors());  // This is needed to handle preflight requests (OPTIONS)

// Sample API endpoint for vendor matching
app.post('/api/match-vendors', (req, res) => {
    const { learning_type, industry, preferred_outcomes } = req.body;

    // Dummy response for now
    const vendors = [
        { vendor_name: 'Vendor 1', total_match_score: 95 },
        { vendor_name: 'Vendor 2', total_match_score: 88 },
    ];

    res.json({ vendors });
>>>>>>> 43640cf2a7f835b7e67638a10de9806f62b5672b
});

// Start the server
app.listen(port, () => {
<<<<<<< HEAD
    console.log(`Server is running on http://localhost:${port}`);
=======
    console.log(`Server running on http://localhost:${port}`);
>>>>>>> 43640cf2a7f835b7e67638a10de9806f62b5672b
});
