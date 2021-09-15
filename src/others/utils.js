const jwt = require('jsonwebtoken');
const generateJWTToken = (email)=>{
    const token = jwt.sign({
        email:email
    },
    'secret',{
        expiresIn:60
    });
    return token;
}

module.exports={
    generateJWTToken
}