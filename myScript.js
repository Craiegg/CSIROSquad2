var axios = require('axios')
var socket = io()
    $(() => {

        $("#search").click(()=>{
            // addWords({label: "Nitrogen", definition: "Gas"})
            var word = {label : $("#searchWord").val()}
            //postWord(word)
            adapter($("#searchWord").val())
        })

        getWords()
    })

    socket.on('word', addWords)

    function addWords(word){
        $("#words").append(`<h4> ${words.label} </h4> <P> ${words.definition} </p>`)
    }
    function getWords(){
        $.get('http://localhost:3000/words',(data) => {
           data.forEach(addWords);
        })
    }
    function postWord(word){
        // console.log('what is happening' + word)
        $.post('http://localhost:3000/words', word)
    }

    var searchResult = []
    var words = [{label:'',definition:''}]

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