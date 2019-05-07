//NodeJs Starting Server Application

//Starting up the express server to be used.

var express = require("express");

//Initializing the Express Server

var app = express();

//Getting the files out of our project working directory

app.use(express.static("./public"));

//Listen to input from specific port number

app.listen(3500);

console.log("Express Server has been started on port 3500");


//AXIOS Initialization 

var axios = require('axios');


var fs = require("fs");
 console.log("\n *Displaying the JSON data inside TestData* \n");
// Get content from file
 var content = fs.readFileSync("./public/testdata.json");
// Define to JSON type
 var jsonContent = JSON.parse(content);
// Get Value from JSON
 console.log("Label:", jsonContent.label);
 console.log("Definition:", jsonContent.definition);
 console.log("URL:", jsonContent.url);
 
console.log("\n *Displayed all elements* \n");



//MongoDb Connection to mLab
var mongoose = require('mongoose');

//Database URL with user and password

var dbUrl = 'mongodb+srv://annotator:annotatortest@cluster0-p6tpe.mongodb.net/test?retryWrites=true'

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
	console.log('MongoDB Connection', err);
	
})

