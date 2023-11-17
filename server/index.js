const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registration'
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM users";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});





app.post('/api/insert/', (req, res) => {

    const { firstName, lastName, contactNumber, username, password } = req.body;

    const insertQuery = `INSERT INTO users (first_name, last_name, contact_number, username, password) VALUES (?, ?, ?, ?, ?)`;
    db.query(insertQuery, [firstName, lastName, contactNumber, username, password], (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data');
            console.log(err);
        } else {
            res.status(200).send('Data inserted successfully');
        }
    });
});






app.listen(3001, () => {
    console.log('Server running on port 3001');
});
