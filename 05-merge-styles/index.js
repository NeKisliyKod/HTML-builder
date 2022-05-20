const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'styles');

let cssBundleContent = '';

function cssBundler(folderPath) {
  fs.readdir(folderPath, {
    withFileTypes: true
  }, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach(file => {
        if (file.isFile() && file.name.slice(-4) === '.css') {
          let fileToCopy = path.join(folderPath, file.name);

          fs.readFile(fileToCopy, 'utf-8', (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let dirToPush = path.join(__dirname, 'project-dist', 'bundle.css');
              cssBundleContent += data;
              fs.writeFile(dirToPush, cssBundleContent, (err) => {
                if (err) console.log(err);
              });
            }
          });
        } else if (!file.isFile()) {
          let newFolderPath = path.join(folderPath, file.name);

          cssBundler(newFolderPath);
        }
      });
    }
  });
}
cssBundler(folderPath);