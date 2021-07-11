const path = require('path');
const rimraf = require('rimraf');

function removeDir(dirPath) {
    rimraf(dirPath, () => {
        console.log(`Directory "${dirPath}" is deleted successfully`);
    });
}

const fileAbsPath = path.resolve(process.cwd(), process.argv[2]);

removeDir(fileAbsPath);