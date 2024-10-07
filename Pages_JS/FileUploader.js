import path from 'path';
import fs from 'fs';

// Function to handle file upload
const fileUploader = function (file, acadmey, level, testType) {
    // Define directory path based on Level and Test Type
    const uploadDir = path.join(__dirname, 'Pre-Made-Tests', acadmey, level, testType);

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save file to the appropriate directory
    const filePath = path.join(uploadDir, file.originalname);

    // Write the file to the specified path
    fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
            console.error(`Error uploading ${file.originalname}:`, err);
            return;
        }
        console.log(`${file.originalname} uploaded successfully.`);
    });
};

export default fileUploader;
