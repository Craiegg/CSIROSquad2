var fs = require('fs')
var axios = require('axios')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const path = require('path');
const Joi = require('joi');

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))





//Database Section

const db = require("./db");
const collection = "words";




// Database Connection 

db.connect((err)=>{
    // If err unable to connect to database
    // End application
    if(err){
        console.log('Unable to Connect to Database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else{
        app.listen(3500,()=>{
            console.log('Successfully Connected to Database');
        });
    }
});


//Return all labels/searched words within database as JSON 

app.get('/getLabel',(req,res)=>{
    // get all words within the DB-CSIRO and Collection-Words
    // send back to user as json
    db.getDB().collection(collection).find({}, { projection: { _id: 0, label: 1 } }).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
			console.log(documents);
            
        }
    });
});



// Saving User Searched Word into Database for Autofill and Caching

app.post('/',(req,res)=>{
    // Taking in Input from the User
    
    const searchWord = req.body;
    console.log(req.body)
    
    //Inserting the Input into the collection words in CSIRO db
            db.getDB().collection(collection).insertOne(searchWord ,(err,result)=>{
                if(err)
                    console.log(err);
                
                else
                    //receiving the response while checking.
                    res.json({documents : result.ops[0],msg : "Successfully inserted Input!!!",error : null});
            });
});


//Database Section End



var words = [{label:'',definition:''}]
var myWord = [{label:''}]
var searchResult = []
app.get('/words', (req, res) => {
    //console.log(words)
    res.send(words)
    while(words.length > 0) {
        words.pop();
    }
    //console.log(words)
})

app.post('/words', (req, res) => {
    console.log(req.body.label)
    io.emit('words',req.body.label)
    adapter(req.body.label)
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log("An user connected")
})

//app.listen(3000)
var server = http.listen(3000, () => {
    console.log("Test Server is listening on port" + server.address().port )
})

function  adapter(searchWord){
    axios.get('http://data.bioontology.org/search?q='+searchWord+'&apikey=0233b5cd-3109-40a0-b575-348de5c3fe3e')
    .then(response => {
        var result = response.data.collection.forEach(collection => {
            searchResult.label = collection.prefLabel
            searchResult.definition = collection.definition
            if(collection.definition != undefined){
                words.push({label: searchResult.label, definition: searchResult.definition})
            }
        //    words.push({label: searchResult.label, definition: searchResult.definition})
           
        });
      console.log("ok");
    })
    .catch(error => {
      console.log(error);
    });
    return;
  }