const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : '/api';

document.addEventListener('DOMContentLoaded', () => {
    // --- EXISTING LOGIC ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('is-active');
            navLinks.classList.remove('active');
        });
    });

    // Intersection Observer for scroll animations
    const setupObservers = () => {
        const faders = document.querySelectorAll('.fade-in-up');
        const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);
        faders.forEach(fader => appearOnScroll.observe(fader));
    };

    // Stats counter animation
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    const animateStats = new IntersectionObserver(function(entries) {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCounter();
            });
        }
    }, { threshold: 0.5 });
    if (statsSection) animateStats.observe(statsSection);


    // --- NEW BACKEND LOGIC ---

    // Auth State
    let currentUser = null;
    let isLoginMode = false; // Default to register mode

    // Elements
    const authModal = document.getElementById('auth-modal');
    const btnLoginNav = document.getElementById('btn-login-nav');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const toggleAuthMode = document.getElementById('toggle-auth-mode');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const authForm = document.getElementById('auth-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const authError = document.getElementById('auth-error');
    
    const userGreeting = document.getElementById('user-greeting');
    const btnLogout = document.getElementById('btn-logout');

    const sportsContainer = document.getElementById('sports-container');
    const newsContainer = document.getElementById('news-container');

    // Modal Logic
    const openModal = (e) => {
        if(e) e.preventDefault();
        authModal.classList.add('active');
        authError.innerText = '';
    };
    const closeModal = () => {
        authModal.classList.remove('active');
    };

    btnLoginNav.addEventListener('click', openModal);
    btnCloseModal.addEventListener('click', closeModal);
    
    toggleAuthMode.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        if (isLoginMode) {
            modalTitle.innerText = 'Welcome Back';
            modalDesc.innerText = 'Login to access premium APIs.';
            toggleAuthMode.innerText = "Don't have an account? Sign up here.";
        } else {
            modalTitle.innerText = 'Join Velocity';
            modalDesc.innerText = 'Create an account to explore premium APIs.';
            toggleAuthMode.innerText = "Already have an account? Login here.";
        }
    });

    // Form Submission
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        const endpoint = isLoginMode ? '/login' : '/register';

        try {
            const res = await fetch(API_URL + endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (!res.ok) {
                authError.innerText = data.error || 'Something went wrong.';
            } else {
                // Success
                currentUser = isLoginMode ? data.user.username : username;
                updateAuthUI();
                closeModal();
                usernameInput.value = '';
                passwordInput.value = '';
            }
        } catch (err) {
            authError.innerText = 'Failed to connect to server. Is it running?';
        }
    });

    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        currentUser = null;
        updateAuthUI();
    });

    const updateAuthUI = () => {
        if (currentUser) {
            btnLoginNav.style.display = 'none';
            userGreeting.style.display = 'block';
            userGreeting.innerText = `Hi, ${currentUser}`;
            btnLogout.style.display = 'block';
        } else {
            btnLoginNav.style.display = 'block';
            userGreeting.style.display = 'none';
            btnLogout.style.display = 'none';
        }
    };

    // Fetch Sports APIs
    const fetchSports = async () => {
        try {
            const res = await fetch(API_URL + '/sports');
            const sports = await res.json();
            
            sportsContainer.innerHTML = sports.map((sport, index) => `
                <div class="card glass-effect fade-in-up delay-${index}">
                    <div class="card-img-wrapper">
                        <img src="${sport.img}" alt="${sport.name}" loading="lazy">
                        ${sport.badge ? `<div class="card-badge">${sport.badge}</div>` : ''}
                    </div>
                    <div class="card-body">
                        <h3>${sport.name}</h3>
                        <p>${sport.desc}</p>
                        <a href="${sport.link}" target="_blank" rel="noopener noreferrer" class="card-link">View Details <span>&rarr;</span></a>
                    </div>
                </div>
            `).join('');
            
        } catch (err) {
            sportsContainer.innerHTML = `<div style="text-align: center; width: 100%; color: var(--accent-color);">Failed to load backend API data. Is the Node server running?</div>`;
        }
    };

    const fetchNews = async () => {
        try {
            const res = await fetch(API_URL + '/news');
            const news = await res.json();
            
            newsContainer.innerHTML = news.map((item, index) => `
                <div class="news-card fade-in-up delay-${index}">
                    <div class="news-meta">
                        <span>${item.category}</span>
                        <span>${item.date}</span>
                    </div>
                    <h3 class="news-title">${item.title}</h3>
                </div>
            `).join('');
            
        } catch (err) {
            newsContainer.innerHTML = `<div style="text-align: center; width: 100%; color: var(--accent-color);">Failed to load news API data. Is the Node server running?</div>`;
        }
    };

    // Run fetches
    fetchSports().then(() => setupObservers());
    fetchNews().then(() => setupObservers());

});
