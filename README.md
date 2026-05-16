# 🏆 Velocity Sports Network

> A premium, full-stack sports web application with live API data, user authentication, and a stunning dark-mode UI.

**🌐 Live Demo:** [https://velocity-sports.onrender.com](https://velocity-sports.onrender.com)

---

## ✨ Features

- **Premium Dark UI** — Glassmorphism design with neon accents and smooth micro-animations
- **User Authentication** — Register & Login system with a sleek modal, backed by SQLite
- **Dynamic Sports Cards** — Fetched live from the backend API with links to FIFA, Wimbledon, and the Olympics
- **Latest News Section** — Sports headlines served from the Express backend
- **Animated Stats Counter** — Scroll-triggered counters for live events, leagues, and more
- **Fully Responsive** — Mobile-friendly layout with hamburger navigation
- **Scroll Animations** — Intersection Observer-powered fade-in effects throughout

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, Vanilla CSS, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite3 |
| **Fonts** | Google Fonts (Outfit, Inter) |
| **Images** | Unsplash |
| **Deployment** | Render |

---

## 📁 Project Structure

```
velocity-sports/
│
├── index.html        # Main HTML structure & Auth modal
├── styles.css        # Full design system — glassmorphism, animations, responsive
├── script.js         # Frontend logic — fetch APIs, auth flow, scroll animations
│
├── server.js         # Express backend — API routes for sports, news & auth
├── database.js       # SQLite connection & users table setup
│
├── package.json      # Node.js dependencies & start script
└── .gitignore        # Excludes node_modules, users.db, etc.
```

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/vedansh-19/velocity-sports.git
cd velocity-sports

# 2. Install dependencies
npm install

# 3. Start the server
npm start

# 4. Open in browser
# Navigate to http://localhost:3000
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/sports` | Returns list of featured sports with links |
| `GET` | `/api/news` | Returns latest sports news headlines |
| `POST` | `/api/register` | Create a new user account |
| `POST` | `/api/login` | Login with existing credentials |

### Example Response — `/api/sports`
```json
[
  {
    "id": 1,
    "name": "Pro Football",
    "desc": "Experience the thrill of the gridiron...",
    "img": "https://images.unsplash.com/...",
    "badge": "Live Now",
    "link": "https://www.fifa.com"
  }
]
```

---

## 🔐 Authentication

User accounts are stored in a local SQLite database (`users.db`).

- **Register** → Click "Join Now" in the navbar → Fill in username & password
- **Login** → Toggle to login mode in the modal
- **Logout** → Click "Logout" in the navbar once logged in

> ⚠️ **Note:** On Render's free tier, the SQLite database resets on each redeploy since the filesystem is ephemeral. For persistent accounts, upgrading to PostgreSQL is recommended.

---

## 🌐 Deployment (Render)

This project is deployed on [Render](https://render.com).

| Setting | Value |
|---|---|
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Environment Variable** | `PORT` (auto-set by Render) |

> On the free tier, the server sleeps after 15 minutes of inactivity. The first visit after sleep may take ~30 seconds to load.

---

## 🔗 External Links

- 🏟️ **FIFA** — [fifa.com](https://www.fifa.com)
- 🎾 **Wimbledon** — [wimbledon.com](https://www.wimbledon.com)
- 🏃 **Olympics Athletics** — [olympics.com](https://www.olympics.com/en/sports/athletics/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by <a href="https://github.com/vedansh-19">vedansh-19</a></p>
