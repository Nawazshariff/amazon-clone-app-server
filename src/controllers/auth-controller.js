const mongodbFunc = require('../db');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const util = require('../others/utils');

const signUp = (req,res,next)=>{
const userRec = new User(
    req.body.fName,
    req.body.lName,
    req.body.email,
    req.body.pwd,
    req.body.lang
    );
let db = mongodbFunc.getDb().db();
db.collection('users').findOne({"email":userRec.email}).then(resultDoc=>{
    if(resultDoc){
        res.status(200).json({
            message:'Email id already exists'
        });
    }else{
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return res.status(500).json({
                message:err.message
            });
        }else{
            bcrypt.hash(userRec.pwd,salt,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        message:err.message
                    });
                }else{
                    userRec.pwd=hash;
                    db.collection('users').insertOne(userRec).then(result=>{
                        if(result && result.insertedCount === 1){
                            res.status(201).json({
                                message:'User inserted successfully',
                                data:result.insertedId
                            })
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            });
        }
    });
    }
}).catch(err=>{
    console.log(err);
});
}

const login = (req,res,next)=>{
    const {email,pwd} = req.body
    let db = mongodbFunc.getDb().db();
    if(email && pwd){
        db.collection('users').findOne({'email':email}).then(resultDoc=>{
            if(resultDoc){
                bcrypt.compare(pwd,resultDoc.pwd,(err,result)=>{
                    if(err){
                        return res.status(500).json({
                            message:err.message
                        });
                    }else{
                        if(result){
                            const token = util.generateJWTToken(email);
                            res.cookie('a_b_s_t',token,{
                                maxAge:5*3600,
                                httpOnly:true
                            });
                            res.status(200).json({
                                message: 'Login successfull'
                            });
                        }else{
                            res.status(500).json({
                                message: 'Auth failed'
                            });
                        }
                    }
                })
            }else{
                return res.status(400).json({
                    message: 'Auth failed'
                });
            }
        })
        .catch(err=>{
            res.status(500).json({
                message:err.message
            });
        })
    }
}

module.exports={
    signUp,
    login
}