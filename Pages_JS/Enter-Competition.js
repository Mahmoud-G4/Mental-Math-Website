const connection = require('./DataBase_conn'); // Import database connection

const CompetitionHandler = async (req, res) => {
    const { username, student_code, email, phone, CompetitionToken } = req.body; // Extract data from the form submission

    // Validate competition token input
    if (!CompetitionToken || CompetitionToken.length < 6) {
        return res.status(400).json({ message: 'Invalid competition token' });
    }

    // Verify if the user exists and if the competition token matches the one in the database
    const checkUserQuery = 'SELECT * FROM users WHERE student_code = ? AND email = ?';
    connection.query(checkUserQuery, [student_code, email], (err, userResults) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (userResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the competition token matches
        const user = userResults[0];
        if (user.competition_token !== CompetitionToken) {
            return res.status(401).json({ message: 'Incorrect competition token' });
        }

        // Insert competition entry into the competition_entries table
        const insertCompetitionQuery = 'INSERT INTO competition_participant (student_code, competition_token) VALUES (?, ?)';
        connection.query(insertCompetitionQuery, [student_code, CompetitionToken], (err, competitionResult) => {
            if (err) {
                console.error('Error saving competition entry:', err);
                return res.status(500).json({ message: 'Could not save competition entry' });
            }

            // Success response
            res.status(200).json({ message: 'Competition entry submitted successfully' });
        });
    });
};

module.exports = CompetitionHandler;
