const sql = require('mssql');

// Database configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Use this if you're on Azure SQL or want encrypted connections
        trustServerCertificate: true // Set this to true for development; use false for production
    }
};

// Function to connect to the database
const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Connected to MSSQL database');
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
};

module.exports = {
    connectDB,
    sql
};