const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create users table if it doesn't exist
        // Note: For a production app, we would hash the password using bcrypt. 
        // We're storing plaintext here for simplicity in this demo environment.
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`);
    }
});

module.exports = db;
