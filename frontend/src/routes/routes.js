const express = require('express');
const router = express.Router();
const baseURL = require('../public/js/api');
const axios = require('axios');
const moment = require('moment');

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

    axios.get(baseURL + '/category/' + slug).then((category) => {
        if(category){

            axios.get(baseURL + '/article/' + slug).then(articles => {
                if(articles.data.error != true ){
                    const articlesNotFound = '';
                    const dataPost = articles.data;
                    res.render('articlesByCategory.ejs', { slug: slug, categoryName: category.data, articlesNotFound: articlesNotFound, articles: articles.data, moment })
                } else {
                    const articlesNotFound = 'Parece que essa categoria ainda não possui nenhum artigo cadastrado, seja o primeiro a publicar!';
                    res.render('articlesByCategory.ejs', { slug: slug, categoryName: category.data, articlesNotFound: articlesNotFound, articles: null })
                }
            }).catch(err => {
                console.log(err);
            })
            
        } else {
            res.redirect('/categorias')
        }
    }).catch(err => {
        console.log(err);
    })

});

router.get('/artigo', (req, res) => {

    axios.get(baseURL + '/category').then((category) => {
        res.render('newArticle.ejs', { category: category.data });
    }).catch(err => {
        console.log(err);
    })

})

module.exports = router;