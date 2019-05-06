var fs = require('fs')
var axios = require('axios')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)


app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

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