const express = require('express');
const app = express();
const ejs = require('ejs');
const routes = require('./routes/routes');

// Setting JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Static folder
app.use(express.static(__dirname + '/public'));

// Setting ejs
app.set('view engine', 'ejs');

// Setting routes
app.use('/', routes);

// Frontend listener
app.listen(3000, () => {
    console.log('Frontend running');
})