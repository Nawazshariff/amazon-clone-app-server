const jwt = require('jsonwebtoken');
exports.validate = (req,res,next)=>{
    if(req.headers.cookie){
        const token = req.headers.cookie.toString().split('a_b_s_t=')[1].trim();
        try{
            const decode = jwt.verify(token,'secret');
            next();
        }catch(err){
            return res.status(401).json({
                message:'not authorized'
            });
        }
    }else{
        return res.status(401).json({
            message:'not authorized'
        });
    }
}