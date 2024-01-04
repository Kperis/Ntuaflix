const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
//const { pool } = require('./utils/database');

const app = express();

// lines 17-26 ensure frontend-backend connection 
//const publicDirectory = path.join(__dirname, './public');
//app.use(express.static(publicDirectory));
app.use(cors());
// Parse url-encoded bodies (as sent by HTML forms, for example signup)- get data from forms
app.use(express.urlencoded({ extended: false}));
// Parse JSON bodies (as sent by API clients), ensure that data from forms comes as jsons
app.use(express.json()); 

app.set('view engine', 'hbs'); 

/* Import routes */
// Εδώ φορτώνουμε τα routes files που θα χρειαστούμε για κάθε endpoint
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
//const { pool } = require('undici-types');

/* Routes used */
// Εδώ γίνεται ένα αρχικό indexing
app.use('/ntuaflix_api', indexRoutes);
app.use('/ntuaflix_api/admin', adminRoutes);
app.use('/ntuaflix_api/auth', authRoutes);

app.use((req, res, next) => { res.status(500).json({ message: 'Interval Server Error' }) });

module.exports = app;