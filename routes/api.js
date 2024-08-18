const express = require('express');
const cors = require('cors');
const router = express.Router();
const { sql } = require('../config/db'); // Import sql object to execute queries

// Define a sample route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});
// ========================================================================================= table names
// Example of a GET route to fetch all table names in the current database
router.get('/tables', async (req, res) => {

    try {
        const result = await sql.query`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`;
        const tableNames = result.recordset.map(record => record.TABLE_NAME);
        res.json(tableNames); // Send the table names as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});




// Example of a GET route to fetch data from a specific table

// ========================================================================================= doctor table 
// Example of a GET route to fetch data from a table
router.get('/doctors', async (req, res) => {
    try {
        const result = await sql.query`SELECT *,(SELECT Name FROM Department De WHERE De.Department_ID = Do.Department_ID) as Department_Name From Doctor Do; `;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});


// Example of a POST route to insert data into the doctor table
router.post('/doctor', async (req, res) => {
    const { Doctor_ID, Name, Specialization, Phone, Email, Department_ID } = req.body;

    try {
        await sql.query`INSERT INTO Doctor (Name, Specialization, Phone, Email, Department_ID) 
                        VALUES (${Name}, ${Specialization}, ${Phone}, ${Email}, ${Department_ID})`;
        res.status(201).send('Insert data to Doctor table success');
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});
// Example of a PUT route to update data in the doctor table
router.put('/doctor/:Doctor_ID', async (req, res) => {
    const { Doctor_ID } = req.params;
    const { Name, Specialization, Phone, Email, Department_ID } = req.body;
    try {
        await sql.query`UPDATE Doctor 
                        SET Name = ${Name}, Specialization = ${Specialization}, Phone = ${Phone}, Email = ${Email}, Department_ID = ${Department_ID}
                        WHERE Doctor_ID = ${Doctor_ID}`;
                        
        res.send('Update data to Doctor table success');
        console.log('update ',req.body);
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// ------------------------------------------------------------------------------------------------ doctor table

// ========================================================================================= patient table
router.get('/departments', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Department`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});
// ========================================================================================= patient table
router.get('/patients', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Patient`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
}  );

// ========================================================================================= nurse table
router.get('/nurses', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Nurse`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// ========================================================================================= room table
router.get('/rooms', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Room`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// ========================================================================================= appointment table
router.get('/appointments', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Appointment`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// ========================================================================================= prescription table
router.get('/prescriptions', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Prescription`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// ========================================================================================= medicine table
router.get('/medications', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Medication`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});
// ========================================================================================= phamacy table
router.get('/pharmacies', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Pharmacy`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});


router.get('/beds', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Bed`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});



// create function to check bed availability 
router.get('/bed/available', async (req, res) => {
    try {
        const result = await sql.query`SELECT b.Bed_ID, b.Bed_Number, r.Room_ID, r.Room_Number, r.Type FROM Bed b JOIN Room r ON b.Room_ID = r.Room_ID WHERE b.Is_Occupied = 0;`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// create function to call Appointment table 
router.get('/appointments', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Appointment`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// create function to call Medical_Record table
router.get('/medical_records', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Medical_Record`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// create function to call Admission table
router.get('/admissions', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Admission`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// create function to call Billing table

router.get('/billings', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Billing`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});


// create function to call Treatent_Log table
router.get('/treatment_logs', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Treatment_Log`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// create function to call Patient_Queue table 
router.get('/patient_queues', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Patient_Queue`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});

// create function to call prescription_medication table
router.get('/prescription_medications', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Prescription_Medication`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});


// create function to call  table

// create function to call Users table
router.get('/users', async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Users`;
        res.json(result.recordset); // Send the result set as JSON
    } catch (err) {
        console.error('SQL query error:', err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;

