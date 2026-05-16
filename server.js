const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// --- MOCK SPORTS APIs ---
// In a real app, you would make fetch requests to NewsAPI or TheSportsDB here.
// For now, we return mock data so the frontend buttons work beautifully.

app.get('/api/news', (req, res) => {
    res.json([
        { id: 1, title: "Championship Finals Set for This Weekend", category: "Football", date: "Today" },
        { id: 2, title: "New Record Broken in 100m Sprint", category: "Athletics", date: "Yesterday" },
        { id: 3, title: "Underdog Team Secures Playoff Spot", category: "Basketball", date: "2 days ago" }
    ]);
});

app.get('/api/sports', (req, res) => {
    res.json([
        { id: 1, name: "Pro Football", desc: "Experience the thrill of the gridiron with exclusive coverage and stats.", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop", badge: "Live Now", link: "https://www.fifa.com" },
        { id: 2, name: "Street & Court", desc: "From local courts to the pro leagues, follow every dunk and crossover.", img: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=800&auto=format&fit=crop", badge: null, link: "https://www.wimbledon.com" },
        { id: 3, name: "Track & Field", desc: "Speed, endurance, and breaking limits. The heart of pure athletics.", img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800&auto=format&fit=crop", badge: null, link: "https://www.olympics.com/en/sports/athletics/" }
    ]);
});

// --- ACCOUNT CREATION APIs ---
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }

    try {
        const newUser = db.addUser(username, password);
        res.json({ message: "Registration successful!", userId: newUser.id });
    } catch (err) {
        return res.status(400).json({ error: "Username already exists" });
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = db.findUser(username, password);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful!", user: { username: user.username } });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
