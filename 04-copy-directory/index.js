const fs = require('fs');
const path = require('path');

let copyDir = path.join(__dirname, 'files-copi');

fs.rm(copyDir, {
  recursive: true
}, () => {
  fs.mkdir(copyDir, () => {
    console.log('Directory copied successfully!');
  });

  const folderToCopy = path.join(__dirname, 'files');

  function fileCopy(folderPath) {
    fs.readdir(folderPath, {
      withFileTypes: true
    }, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach(file => {
          if (file.isFile()) {
            let pathToFile = path.join(folderPath, file.name);
            let folderToCopy = path.join(__dirname, 'files-copi');

            fs.copyFile(pathToFile, path.join(folderToCopy, file.name), err => {
              if (err) console.log(err);
            });
          } else {
            let newFolderPath = path.join(folderPath, file.name);

            fileCopy(newFolderPath);
          }
        });
      }
    });
  }
  fileCopy(folderToCopy);
});