const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'users.json');

// Initialize the JSON "database" file if it doesn't exist
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify({ users: [] }, null, 2));
    console.log('Created users.json database.');
}

const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

const db = {
    // Mimics: INSERT INTO users (username, password) VALUES (?, ?)
    addUser: (username, password) => {
        const data = readDB();
        if (data.users.find(u => u.username === username)) {
            throw new Error('Username already exists');
        }
        const newUser = { id: Date.now(), username, password };
        data.users.push(newUser);
        writeDB(data);
        return newUser;
    },

    // Mimics: SELECT * FROM users WHERE username = ? AND password = ?
    findUser: (username, password) => {
        const data = readDB();
        return data.users.find(u => u.username === username && u.password === password) || null;
    }
};

console.log('JSON database initialized successfully.');
module.exports = db;
