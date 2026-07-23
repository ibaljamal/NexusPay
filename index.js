const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/', async (req, res) => {
  try {
    // Example: Fetching dynamic content from PostgreSQL
    const { rows } = await pool.query('SELECT NOW()');
    res.send(`<h1>Dynamic Site Active!</h1><p>DB Time: ${rows[0].now}</p>`);
  } catch (err) {
    res.status(500).send("Database connection error.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
