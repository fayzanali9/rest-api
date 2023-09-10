const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const routes = require('./backend/routes/routes');
const path = require('path');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });



require('dotenv').config();
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});