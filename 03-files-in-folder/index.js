const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

function fileSearcher(folderPath) {
  fs.readdir(folderPath, {
    withFileTypes: true
  }, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach(file => {
        if (file.isFile() && !file.name.includes('.git')) {
          let pathToFile = path.join(folderPath, file.name);

          fs.stat(pathToFile, (err, stats) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${file.name.slice(0,file.name.indexOf('.'))} - ${file.name.slice(file.name.indexOf('.') + 1)} - ${stats.size}b`);
            }
          });
        } else if (!file.name.includes('.git')) {
          let newFolderPath = path.join(folderPath, file.name);

          fileSearcher(newFolderPath);
        }
      });
    }
  });
}
fileSearcher(folderPath);