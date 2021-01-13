const express = require('express');
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const sendMail = require('../Mail/sender');
const jwt = require('jsonwebtoken');
const secret = '1qzCtlJGjD42i4P5af71rjTscYkYyUAoBzrwb12B4w4dpJYFoW';

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
                res.status(403).json({result: `User not found with the e-mail ${email}`});
            } else {
               const hash = result.password;
               const validator = bcrypt.compareSync(password, hash);

               if(validator){

                   jwt.sign({ 
                       username: result.username,
                       email: result.email, 
                       admin: result.admin,
                       id: result.id
                    }, secret, { expiresIn: '1h'}, (err, token) => {
                        if(err){
                            res.status(400).json({error: 'Fail to create the token'});
                        } else {
                            res.status(200).json({token: token});
                        }
                    });

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

                    // sendMail(
                    //     // Sender name
                    //     'Devblog', 
                    //     // Sender email
                    //     'contato@nxadmin.com.br', 
                    //     // Recipient
                    //     `${userData.email}`, 
                    //     // Subject
                    //     `Cadastro realizado com sucesso!`, 
                    //     // Content
                    //     `Olá, ${userData.username}! Passando aqui para te avisar que sua conta foi criada com sucesso no Devblog, esperamos que você curta basta nosso conteúdo! <3`
                    // );

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