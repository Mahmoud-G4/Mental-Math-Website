const path = require('path');
const fs = require('fs');

const fileUploader = function (file, level, testType) {
    // Define directory path based on Level and Test Type
    const uploadDir = path.join(__dirname, 'Pre-made-tests', level, testType);

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save file to appropriate directory
    const filePath = path.join(uploadDir, file.originalname);

    fs.writeFile(filePath, file.buffer, (err) => {
        if (err) throw err;
        console.log(`${file.originalname} uploaded successfully.`);
    });
};

module.exports = fileUploader;
