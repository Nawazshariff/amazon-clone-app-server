const mongodbFunc = require('../db');

const getProducts = (req,res,next)=>{
    const db = mongodbFunc.getDb().db();
    let products=[];
    db
    .collection('products')
    .find()
    .forEach(productDoc =>{
        products.push(productDoc);
    })
    .then(result=>{
        res.status(200).json({
            products:products
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

module.exports={
    getProducts
}