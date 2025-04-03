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
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
