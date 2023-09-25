const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    store: new FileStore(),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// Mock user data (replace with a database)
const users = [{ username: 'user', password: 'password' }];

// Routes
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && user.password === password) {
        req.session.user = username;
        res.sendFile(path.resolve(__dirname, 'login.html'));
    } else {
        res.status(401).send('Authentication failed');
    }
});

app.get('/auth/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
});

app.get('/', (req, res) => {
    if (req.session.user) {
        res.send('Welcome, ' + req.session.user + '! <a href="/auth/logout">Logout</a>');
    } else {
        res.sendFile(path.resolve(__dirname, 'login.html'));
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
