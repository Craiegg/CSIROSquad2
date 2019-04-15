//NodeJs Starting Server Application

//Starting up the express server to be used.

var express = require("express");

//Initializing the Exprss Server

var app = express();

//Getting the files out of our project working directory

app.use(express.static("./public"));

//Listen to input from specific port number

app.listen(3500);

console.log("Express Server has been started on port 3500");