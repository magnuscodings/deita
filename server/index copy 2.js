const express = require('express');
const app = express();
const mysql = require('mysql');



const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registration'
  });

app.get('/', (req, res) => {


    const sqlInsert = `INSERT INTO users (first_name, last_name, contact_number, username, password) VALUES ('pedro', 'pedro', 'pedro', 'pedro', 'pedro')`;

    db.query(sqlInsert , (err, result) => {
        res.send('Hello Worasdld!');
    });
    
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
})

