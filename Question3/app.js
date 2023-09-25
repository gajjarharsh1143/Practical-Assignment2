const mongoose = require('mongoose');
const express = require('express');
const app = express();
const user1 = require('./Models/UserModels');
const bodyparser = require('body-parser');
const crypto = require('crypto');
const redis = require('redis');
const session = require('express-session');
const connectredis = require('connect-redis');
const RedisStore = connectredis(session);
const redisclient = redis.createClient();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/StudentDB')
    .then(() => {
        console.log("connection sucess")
    })
    .catch((err) => {
        console.log(err);
    })

const genraterandomstring = (length) => {
    return crypto.randomBytes(length).toString('hex');
}

app.use(
    session({
        store: new RedisStore({ client: redisclient }),
        store: new RedisStore({ host: "localhost", port: 3000 }),
        secret: genraterandomstring(32),
        resave: false,
        saveUninitialized: true,
        name: 'userId',
        cookie: { secure: false, maxAge: 5 * 60 * 1000, },
        milliseconds
    })
)
app.get('/', (req, res) => {
    if (req.session.userId) {
        return res.redirect('./mainpage');
    }
    res.redirect('./login');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userdata = await user1.findOne({ username: username });

    if (userdata) {
        if (userdata.password == password) {
            req.session.userId == userdata._id;
            res.render('mainpage', { userdata });
        }
        else {
            return res.render('login');
        }
    }
})

app.get('/home', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    res.render('mainpage', {
        user: await user1.findById({ _id: req.session.userId })
    });
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/login');
    });
});

app.listen(2000, () => {
    console.log("listening on port 2000");
})