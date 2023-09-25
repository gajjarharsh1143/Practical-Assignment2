const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/StudentRoute');


app.use('/auth', authRoutes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/StudentDB", { useNewUrlParser: true });

const port = process.env.PORT || 3000;

app.listen(port);
console.log('Server is running on port ' + port);
