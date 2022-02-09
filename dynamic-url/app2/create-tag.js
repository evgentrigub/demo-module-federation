const fs = require('fs');
const path = require('path');

const storeVersion = (outputPath) => {
  const version = `1.2345.${new Date().getMinutes()}`;
  const filename = 'build-tag';
  const fullPath = path.join(outputPath, filename);
  fs.writeFile(fullPath, version, (err) => {
    if (err) {
      throw new Error(err.toString());
    }
    console.log('Version \x1b[33m\x1b[1m%s\x1b[0m extracted to \x1b[1m%s\x1b[0m ', version, fullPath);
  });
}

storeVersion('dist');