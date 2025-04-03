const express = require('express');
const { Client } = require('pg'); // Import pg to interact with Postgres
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Postgres client setup
const client = new Client({
  user: 'postgres', // Replace with your actual DB user
  host: 'localhost',
  database: 'uls_sync', // Replace with your actual DB name
  password: 'Tyrique2@', // Replace with your actual DB password
  port: 5432,
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err.stack));

// Vendor matching endpoint
app.post('/api/match-vendors', async (req, res) => {
    const { learning_type, industry, preferred_outcomes } = req.body;

    try {
        const query = `
            SELECT 
                c.client_name,
                v.name AS vendor_name,
                c.learning_type,
                c.industry,
                c.preferred_outcomes,
                (CASE WHEN c.learning_type = v.learning_capabilities THEN 1 ELSE 0 END) + 
                (CASE WHEN c.industry = v.industry THEN 1 ELSE 0 END) AS total_match_score
            FROM
                client_assessments c
            JOIN
                vendors v
            ON
                c.learning_type = v.learning_capabilities
                AND c.industry = v.industry
            WHERE
                c.learning_type = $1
                AND c.industry = $2
                AND c.preferred_outcomes = $3
            ORDER BY total_match_score DESC;
        `;  // <-- Added closing backtick here!

        // Execute the query
        const result = await client.query(query, [learning_type, industry, preferred_outcomes]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No vendors matched your criteria." });
        }

        res.status(200).json({ vendors: result.rows });
    } catch (error) {
        console.error("Error fetching vendors:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
