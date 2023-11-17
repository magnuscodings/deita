const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'registration'
});

// Connect to MySQL
connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

// Parse URL-encoded bodies for POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle POST request to insert user data
app.post('/insertUserData', (req, res) => {
  const { firstName, lastName, contactNumber, username, password } = req.body;

  const insertQuery = `INSERT INTO users (first_name, last_name, contact_number, username, password) VALUES (?, ?, ?, ?, ?)`;
  connection.query(insertQuery, [firstName, lastName, contactNumber, username, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
    } else {
      console.log('User data inserted successfully!');
      res.status(200).send('User data inserted successfully!');
    }
  });
});

// Start the server
const PORT = 3306; // You can change this to any port you prefer
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
