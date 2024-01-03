const express = require('express');
const cors = require('cors');

/* Import routes */
// Εδώ φορτώνουμε τα routes files που θα χρειαστούμε για κάθε endpoint
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');


/* Extra things for some reason */
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes used */
// Εδώ γίνεται ένα αρχικό indexing
app.use('/ntuaflix_api', indexRoutes);
app.use('/ntuaflix_api/admin', adminRoutes);

app.use((req, res, next) => { res.status(500).json({ message: 'Interval Server Error' }) });

module.exports = app;