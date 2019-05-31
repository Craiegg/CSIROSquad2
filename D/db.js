const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "csirodb";
// location of where our mongoDB database is located
const url = "mongodb+srv://db1:admin123@cluster1-w69jz.mongodb.net/test?retryWrites=true";
// Options for mongoDB
const mongoOptions = {useNewUrlParser : true};

const state = {
    db : null
};

const connect = (cb) =>{
    // if state is not NULL
    // Means we have connection already, call our CB
    if(state.db)
        cb();
    else{
        // attempt to get database connection
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            // unable to get database connection pass error to CB
            if(err)
                cb(err);
            // Successfully got our database connection
            // Set database connection and call CB
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

// returns OBJECTID object used to 
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

// returns database connection 
const getDB = ()=>{
    return state.db;
}
// returns database connection 
const getRecords = async ( collection, condition)=>{
    return state.db.collection(collection).find(condition).toArray();
}
const saveCollection = (collection, data) => {
    state.db.collection(collection).insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });
}

module.exports = {getDB,connect,getPrimaryKey, saveCollection, getRecords};