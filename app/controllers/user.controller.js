"use strict";
const User = require("../models/user.model");
const jwt=require('jsonwebtoken');
const key=require("../key");

 exports.singIn = (req,res) => {
    User.findOne({email:req.body.email}).then((user)=>{
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(isMatch){
                var token=jwt.sign({userId:user.id},key.tokenKey);
                res.status(200).json({
                    userId:user.id,
                    username:user.username,
                    image:user.image,
                    name:user.first,
                    token
                })
            }
            else{
                res.status(400).json({message:'Invalid Password/Username'});
            }
        })
    }).catch((err)=>{
        res.status(400).json({message:'Invalid Password/Username'});
    })
};

 exports.create = (req, res) => {
   const user = new User(req.body);
   user.save((err, user) => {
       if(err) {
           return res.status(422).json({
               msg: 'Server encountered an error creating the user.',
               error: err
           });
       }
       else {
           return res.status(200).json({
               msg: 'User successfully created.',
               data: user
           });
       }
   });
 };