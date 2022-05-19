const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let filePath = path.join(__dirname);
let textFileContent = '';

function writeStream(content) {
  fs.writeFile(filePath + '/messages.txt', textFileContent += content, (error) => {
    if (error) console.log(error);
  });
}
writeStream('');

function t() {
  rl.question('Enter your text please:\n ', (answer) => {
    if (!answer.includes('exit')) {
      writeStream(answer);
      t();
    } else {
      rl.close();
    }
  });
}
t();

process.on('exit', () => {
  console.log('We finished, good luck');
});