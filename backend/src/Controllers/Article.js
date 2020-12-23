const express = require('express');
const article = require('../models/article');
const category = require('../models/category');

module.exports = {

    async getArticle(req, res){
        await article.findAll().then(article => {
            res.status(200).json(article);
        }).catch(err => {
            console.log(err);
        })
    },

    async createArticle(req, res){
        const { article_title, author, content, categoryId } = req.body;
        
        await article.create({
            article_title: article_title,
            author: author,
            content: content,
            categoryId: categoryId
        }).then(() => {
            res.status(201).json({result: 'New article was successfully created'});
        }).catch(err => {
            console.log(err);
        })
    },

    async deleteArticle(req, res){
        const { id } = req.params;

        await article.findOne({ where: {
            id: id
        }}).then(result => {
            if(result){
                article.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.status(200).json({result: 'This article was successfully deleted'});
                }).catch(err => {
                    console.log(err);
                })
            } else {
                res.status(400).json({error: `There is not an article related to the id ${id}, inform a new one and try again`});
            }
        })
    },

    async updateArticle(req, res){
        const { id, article_title, author, content, categoryId } = req.body;

        await article.findOne({ where: {
            id: id
        }}).then(result => {
            if(result){
                article.update({
                    article_title: article_title,
                    author: author,
                    content: content,
                    categoryId: categoryId
                }, { where: {
                    id: result.id
                }}).then(() => {
                    res.status(200).json({result: 'This article was successfully updated'});
                }).catch(err => {
                    console.log(err);
                })
            } else {
                res.status(400).json({error: `There is not an article related to the id ${id}, inform a new one and try again`});
            }
        })
    },

    async articleBySlug(req, res){
        const { slug } = req.params;

        await category.findOne({
          
            where: {
                slug: slug
            }

        }).then(result => {
           if(result){
               article.findAll({
                   where: {
                       categoryId: result.id
                   }
               }).then((articles) => {

                    if(articles != "" && articles != undefined && articles != null){
                        res.status(200).json(articles);
                    } else {
                        res.json({error: true, result: 'Articles were not found for the category ' + result.category_name});
                    }
                 
               }).catch(err => {
                   console.log(err); 
               });
           } else {
                res.status(404).json({result: 'This category was not registered so far'});
           }
        }).catch(err => {
            console.log(err);
        })
    }

}