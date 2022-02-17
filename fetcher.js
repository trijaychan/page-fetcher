const request =  require("request");
const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);

const createHTML = function(path, text) {
  fs.writeFile(path, text, (err) => {
    if (err) {
      console.error(err);
      return
    } else console.log(`Downloaded and saved ${text.length} bytes to ${args[1]}`);
  });
}

request(args[0], (error, response, body) => {
  if (error !== null) console.log("Error:", error);

  let createFile = true;

  fs.existsSync(args[1]) ? (console.log("File already exists."), createFile = false) : null;
  
  if (!createFile) {
    readline.question("Enter (Y) to overwrite file: ", input => {
      if (input.toLowerCase() ===  "y") createHTML(args[1], body);
      else console.log("Exiting app.");

      readline.close()
    });
  } else {
    createFile(args[1]);
  }
});