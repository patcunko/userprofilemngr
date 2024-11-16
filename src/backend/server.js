const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');  // PostgreSQL client

// PostgreSQL client setup
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'User',
    password: 'master',
    port: 5432, // default PostgreSQL port
});

client.connect(); // Establish connection to the database

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

app.get('/api/users', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Database error');
    }
});

// Route to get user details (fetch from SQL database)
app.get('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const userResult = await client.query('SELECT users.* , name as company_name FROM users INNER JOIN companies ON users.company_id = companies.id WHERE users.id = $1', [userId]);
        const purchasesResult = await client.query('SELECT * FROM purchases WHERE user_id = $1', [userId]);
        const vehiclesResult = await client.query('SELECT * FROM vehicles WHERE company_id = $1', [userResult.rows[0].company_id]);
        const paymentCredsResult = await client.query('SELECT * FROM payment_credentials WHERE user_id = $1', [userId]);

        res.json({
            user: userResult.rows[0],
            purchases: purchasesResult.rows.map((row) => ({...row, purchase_date: row.purchase_date.toISOString().substring(0, 10)})),
            vehicles: vehiclesResult.rows,
            paymentCreds: paymentCredsResult.rows,
        });
    } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
    }
});

// Route to update user contact info (update SQL database)
app.put('/api/user/contact/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const { email, phone_num } = req.body;

    try {
        // Update user contact info in the database
        await client.query(
        'UPDATE users SET email = $1, phone_num = $2 WHERE id = $3',
        [email, phone_num, userId]
        );

        res.json({ message: 'User contact info updated successfully' });
    } catch (err) {
        console.error('Error updating user contact info:', err);
        res.status(500).send('Internal server error');
    }
});

// Route to update payment details (update SQL database)
app.put('/api/user/payment/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const { account_number, expiry_date, cvv } = req.body;

    try {
        // Update payment credentials in the database
        await client.query(
        'UPDATE users SET account_number = $1, expiry_date = $2, cvv = $3 WHERE id = $4',
        [account_number, expiry_date, cvv, userId]
        );

        res.json({ message: 'User payment info updated successfully' });
    } catch (err) {
        console.error('Error updating payment info:', err);
        res.status(500).send('Internal server error');
    }
});

// Route to get company vehicles (fetch from SQL database)
app.get('/api/user/vehicles/:id', async (req, res) => {
    const companyId = parseInt(req.params.id);

    try {
        // Query the database for user's vehicles
        const result = await client.query('SELECT * FROM vehicles WHERE company_id = $1', [companyId]);

        if (result.rows.length > 0) {
        res.json(result.rows);
        } else {
        res.status(404).send('No vehicles found for this company');
        }
    } catch (err) {
        console.error('Error fetching vehicles:', err);
        res.status(500).send('Internal server error');
    }
});

// Route to get user purchase history (fetch from SQL database)
app.get('/api/user/purchases/:id', async (req, res) => {
    const userId = parseInt(req.params.id);

    try {
        // Query the database for user's purchase history
        const result = await client.query('SELECT * FROM purchases WHERE user_id = $1', [userId]);

        if (result.rows.length > 0) {
        res.json(result.rows);
        } else {
        res.status(404).send('No purchase history found for this user');
        }
    } catch (err) {
        console.error('Error fetching purchases:', err);
        res.status(500).send('Internal server error');
    }
});

// Route to update user loyalty points (update SQL database)
app.put('/api/user/loyalty/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    const { points } = req.body;

    try {
        // Update loyalty points in the database
        await client.query('UPDATE users SET loyalty_points = $1 WHERE id = $2', [points, userId]);

        res.json({ message: 'User loyalty points updated successfully' });
    } catch (err) {
        console.error('Error updating loyalty points:', err);
        res.status(500).send('Internal server error');
    }
});

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
