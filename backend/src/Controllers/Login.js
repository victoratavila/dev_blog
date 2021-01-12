const express = require('express');
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const accountCreatedMail = require('../Mail/sender');

module.exports = {

    async getUser(req, res){
        await user.findAll().then(result => {
            res.json(result);
        }).catch(err => {
            console.log(err);
        })
    },

    async login(req, res){
        const { email, password } = req.body;

        await user.findOne({
            where: {
                email: email
            }
        }).then(async result => {

            if(result == [] || result == null || result == undefined || result == ""){
                res.status(404).json({result: `User not found with the e-mail ${email}`});
            } else {
               const hash = result.password;
               const validator = bcrypt.compareSync(password, hash);

               if(validator){
                   res.status(200).json({result: 'User logged'});
               } else {
                   res.status(403).json({error: 'Some of the credentials is wrong, please try again'});
               }
            };

        }).catch(err => {
            console.log(err);
        });
       
       
    },

    async registerUser(req, res){
        let userData = { username, email, admin, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        userData.password = bcrypt.hashSync(password, salt);

        user.findAll({ 
            where: {
                email: userData.email
            }
        }).then(result => {

            if(result == [] || result == null || result == undefined || result == ""){

                user.create(userData).then(() => {
                    res.status(200).json({result: "User successfully created"});
                }).catch(err => {
                    console.log(err);
                })

            } else {
                res.status(409).json({error: `User already exists with the e-mail ${userData.email}, try to register a new one`});
            }

        }).catch(err => {
            console.log(err);
        })
    
    }

}