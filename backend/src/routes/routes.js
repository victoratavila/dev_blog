const express = require('express');
const router = express.Router();
const Category = require('../Controllers/Category');
const Article = require('../Controllers/Article');
const Login = require('../Controllers/Login');

// Category 
router.get('/category', Category.getCategory);
router.post('/category', Category.createCategory);
router.delete('/category/:id', Category.deleteCategory);
router.get('/category/:slug', Category.categoryBySlug);

// Article
router.get('/article', Article.getArticle);
router.post('/article', Article.createArticle);
router.delete('/article/:id', Article.deleteArticle);
router.put('/article', Article.updateArticle);
router.get('/article/:slug', Article.articleBySlug);
router.get('/get-articles/:id', Article.articleById);

// Login
router.post('/user', Login.login);
router.get('/user', Login.getUser);
router.post('/new-user', Login.registerUser);

module.exports = router;