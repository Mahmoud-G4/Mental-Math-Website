import path from 'path';
import fs from 'fs';
import csvParser from 'csv-parser';  // CSV parser to parse CSV files

const fileReader = function (level, testType, fileName, callback) {
    // Define the file path based on level, test type, and file name
    const filePath = path.join(__dirname, 'Pre-made-tests', level, testType, fileName);
    
    let questions = [];

    // Read the file and parse it using csvParser
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            questions.push(row); // Push each row into questions array
        })
        .on('end', () => {
            callback(null, questions); // Pass the parsed questions to the callback on success
        })
        .on('error', (err) => {
            callback(err, null); // Handle any errors during the read or parsing process
        });
};

export default fileReader;
