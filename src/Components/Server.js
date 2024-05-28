const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Endpoint för att spara accepterade användare till databasen
app.post('/saveAcceptedUsers', async (req, res) => {
  const { acceptedUsers } = req.body;

  try {
    // Loopa igenom varje accepterad användare och spara till databasen
    for (const user of acceptedUsers) {
      const { name, email, company, employed } = user;
      const query = 'INSERT INTO users (name, email, company, employed) VALUES (?, ?, ?, ?)';
      await promisifyQuery(query, [name, email, company, employed]);
    }

    res.json({ message: 'Accepted users saved successfully' });
  } catch (error) {
    console.error('Error saving accepted users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Utility function to promisify MySQL queries
function promisifyQuery(query, values) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
}


