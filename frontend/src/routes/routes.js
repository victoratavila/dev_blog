const express = require('express');
const router = express.Router();
const baseURL = require('../public/js/api');
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('home.ejs');
});

// Category

router.get('/categorias', (req, res) => {
    axios.get(baseURL + '/category').then((result) => {
        res.render('category.ejs', { result: result.data });
    }).catch(err => {
        console.log(err);
    })
});

router.get('/categorias/:slug', (req, res) => {
    const { slug } = req.params;
    res.render('articlesByCategory.ejs', { slug: slug})

})

module.exports = router;