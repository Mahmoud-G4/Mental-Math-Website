import connection from './DataBase_conn.js';


// Helper function to generate a 5-digit random token
function generateToken() {
  return Math.floor(10000 + Math.random() * 90000); // Generates a number between 10000 and 99999
}

// Function to check if the token already exists in the database
function isTokenUnique(token, callback) {
  const query = 'SELECT * FROM users WHERE competition_token = ?';
  connection.query(query, [token], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    // If results are empty, the token is unique
    callback(null, results.length === 0);
  });
}

// Handler function for generating a unique token
const CompetitionToken = (req, res) => {
  const userId = req.params.id;

  // Recursive function to generate and check for a unique token
  function generateUniqueToken() {
    const token = generateToken();
    isTokenUnique(token, (err, isUnique) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error checking token uniqueness');
      }

      if (isUnique) {
        // If unique, update the user's record in the database
        const query = 'UPDATE users SET competition_token = ? WHERE ID = ?';
        connection.query(query, [token, userId], (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error updating token in the database');
          }
          // Redirect back to the users table or reload the page
          res.redirect('/Users-Table');
        });
      } else {
        // If not unique, try again
        generateUniqueToken();
      }
    });
  }

  // Start the token generation process
  generateUniqueToken();
};

// Export the handler function
export default  CompetitionToken;
