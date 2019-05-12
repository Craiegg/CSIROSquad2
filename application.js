const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const Joi = require('joi');

const db = require("./db");
const collection = "words";
const app = express();



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'index.html'));
});

//Database Connection

db.connect((err)=>{
    // If err unable to connect to database
    // End application
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else{
        app.listen(3000,()=>{
            console.log('connected to database, app listening on port 3000');
        });
    }
});


//Return all data within database as JSON 

app.get('/getWords',(req,res)=>{
    // get all words within the DB-CSIRO and Collection-Words
    // send back to user as json
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});

/*
app.put('/:id',(req,res)=>{
    // Primary Key of Todo Document we wish to update
    const wordsID = req.params.id;
    // Document used to update
    const userInput = req.body;
    // Find Document By ID and Update
    db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(wordsID)},{$set : {word : userInput.word}},{returnOriginal : false},(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.json(result);
        }      
    });
});
*/

//Saving searched word into Database.

app.post('/',(req,res)=>{
    // Taking in Input from the User
    const userInput = req.body;

//Inserting the Input into the collection words in CSIRO db
            db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
                if(err)
					console.log(err);
                
                else
					//receiving the response while checking.
                    res.json({documents : result.ops[0],msg : "Successfully inserted Input!!!",error : null});
            });
});
