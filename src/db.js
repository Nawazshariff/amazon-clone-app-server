const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const initDb = callback =>{
    if(_db){
        console.log('Database already initialized');
        callback(null,_db);
    }else{
        MongoClient.connect(process.env.DB_URL).then(client=>{
            _db=client
            callback(null,_db);
        })
        .catch(err=>{
            callback(err,_db);
        })
    }
}


const getDb = ()=>{
    if(!_db){
        throw Error('Database not initialized');
    }
    return _db;
}

module.exports = {
    initDb,
    getDb
}