const express = require('express');
const app = express();
const routes = require('./routes/routes');
const connection = require('./database/connection');
var cors = require('cors');

app.use(cors());

// Authenticate database connection
connection.authenticate().then(() => {
    console.log('Connected the database');
}).catch(err => {
    console.log(err);
})

// Setting JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Setting routes
app.use('/', routes);

// Server listener
app.listen(8080, () => {
    console.log('Backend running');
})