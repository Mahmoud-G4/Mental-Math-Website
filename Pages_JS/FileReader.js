const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');  // CSV parser to parse CSV files

const fileReader = function (level, testType, fileName, callback) {
    const filePath = path.join(__dirname, 'Pre-made-tests', level, testType, fileName);
    
    let questions = [];

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            questions.push(row);
        })
        .on('end', () => {
            callback(null, questions);
        })
        .on('error', (err) => {
            callback(err, null);
        });
};

module.exports = fileReader;
