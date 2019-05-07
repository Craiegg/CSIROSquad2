var fs = require("fs");
 console.log("\n *Displaying the JSON data inside TestData* \n");
// Get content from file
 var content = fs.readFileSync("./public/testdata.json");
// Define to JSON type
 var jsonContent = JSON.parse(content);
// Get Value from JSON
 console.log("Fruit:", jsonContent.fruit);
 console.log("Size:", jsonContent.size);
 console.log("Color:", jsonContent.color);
console.log("\n *Displayed all elements* \n");