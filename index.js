const express = require('express');
const { Pool } = require('pg');

// ONLY run dotenv if we are NOT on Render (production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

// Render automatically passes the DATABASE_URL environment variable here
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // REQUIRED for secure cloud DB connections
  }
});

// ... your routes and app.listen logic below


app.get('/', async (req, res) => {
  try {
    // Example: Fetching dynamic content from PostgreSQL
    const { rows } = await pool.query('SELECT* FROM contracts');
   // res.send(`<h1>Dynamic Site Active!</h1><p>DB Time: ${rows[0].now}</p>`);
  } catch (err) {
    res.status(500).send("Database connection error.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
