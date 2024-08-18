const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectDB, sql } = require('./config/db'); // Import the DB connection

const app = express();


app.use(cors({
    origin: 'http://localhost:8081'
}));

// Middleware to parse JSON
app.use(express.json());

// Connect to MSSQL
connectDB();

// Import API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});