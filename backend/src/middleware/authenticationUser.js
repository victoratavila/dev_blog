const express = require('express');
const jwt = require('jsonwebtoken');
const secret = require('./secret.js');

async function auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){

        const bearer = authToken.split(' ');
        const token = bearer[1];
        
        await jwt.verify(token, secret, (err, data) => {
            if(err){
                res.status(401).json({result: 'Invalid token'});
            } else {
                const userLogged = {
                    username: data.username,
                    email: data.email,
                    admin: data.admin,
                    id: data.id
                }
                next();
            }
        })
    
    } else {
        res.status(403).json({result: 'Token not valid'});
    }
   
}

module.exports = auth;