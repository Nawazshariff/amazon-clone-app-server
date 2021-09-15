const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT | 3000;
const mongodbFunc = require('./db');
const productRouter = require('./routes/product-routes');
const authRouter = require('./routes/auth-routes');
const cookieParser = require('cookie-parser');
const validate = require('./middleware/validation');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/products',validate.validate,productRouter);
app.use('/auth',authRouter);


mongodbFunc.initDb((err,db)=>{
    if(err){
        console.log(err);
    }else{
        app.listen(port,()=>{
            console.log('Server is listening at port:- '+port);
        });
    }
});

