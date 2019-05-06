//File system required for reading and writing files
var fs = require('fs')
var axios = require('axios')

var data = {
    url : '',
    explanation : ''
}

var myWord = {
    label : '',
    definition: '',
}
var myWord2 = {
  label : '',
  definition: '',
}
var box = []
var wordBox = []
var wordBox2 = []

//###test API###

// axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
//   .then(response => {
//     // console.log(response.data.url);
//     // console.log(response.data.explanation);
//     data.url = response.data.url
//     data.explanation = response.data.explanation
//     fs.writeFile('data.json',JSON.stringify(data), (err) =>{

//     })
//   })
//   .catch(error => {
//     console.log(error);
//   });


  axios.get('http://vocabs.ands.org.au/repository/api/lda/ardc-curated/gcmd-rucontenttype/8-6-2018-12-10/concept.json')
  .then(response => {
    var testy = response.data.result.items.forEach(items => {
      //console.log(items.definition)
      //console.log(items.prefLabel._value)
      box.push(items.prefLabel._value)
    })
    for(var i =0; i<box.length; i++){
      fs.writeFile('data.json',JSON.stringify(box), (err) =>{

        })
    }
  })
  .catch(error => {
    console.log(error);
  });

  //console.log(box.length);
var searchWord = 'nitrogen';
  axios.get('http://data.bioontology.org/search?q='+searchWord+'&apikey=0233b5cd-3109-40a0-b575-348de5c3fe3e')
  .then(response => {
      var result = response.data.collection.forEach(collection => {
          myWord.label = collection.prefLabel
          myWord.definition = collection.definition
          wordBox.push({label: myWord.label, definition:myWord.definition})
          //console.log(wordBox)
          //myWord.definition = collection.definition
      });

          /*
            Writing data from existing array to a JSON file
          */
          for(var i =0; i<wordBox.length; i++){
            fs.writeFile('newWord.json',JSON.stringify(wordBox), (err) =>{
      
              })
          }
          // fs.writeFileSync('myWord.json',JSON.stringify(myWord), (err) =>{

          // })
    console.log("ok");
    // console.log(response.data.link);
    // data.url = response.data.url
    // data.explanation = response.data.explanation
    // fs.writeFile('data.json',JSON.stringify(data), (err) =>{

    // })
  })
  .catch(error => {
    console.log(error);
  });

//   fs.writeFileSync('myWord.json',JSON.stringify(box), (err) =>{

// })
  
function  adapter(searchWord){
  axios.get('http://data.bioontology.org/search?q='+searchWord+'&apikey=0233b5cd-3109-40a0-b575-348de5c3fe3e')
  .then(response => {
      var result = response.data.collection.forEach(collection => {
          myWord2.label = collection.prefLabel
          myWord2.definition = collection.definition
          // console.log(collection.definition)
          wordBox2.push({label: myWord2.label, definition: myWord2.definition})
      });
          for(var i =0; i<wordBox2.length; i++){
            fs.writeFile('adapter.json',JSON.stringify(wordBox2), (err) =>{
      
              })
          }
    console.log("ok");
  })
  .catch(error => {
    console.log(error);
  });
}

//adapter("melanoma");

// function loadApp(){
//   console.log("App loaded");
//   adapter("oxygen");
// }
// document.onload = loadApp;