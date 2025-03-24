// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const test15 = async (res) => {
  try {
    console.log("test15days AVANT le fetch");
    // Fetch all items from the database
    const rows = await tables.friend.read15Days();
    // Respond with the items in JSON format
    console.log("reponse du fetch 15days", rows);
    return rows;
    // res.json(rows);
  } catch (err) {
    console.log("erreur dans le fetch 15days", err);
    // Pass any errors to the error-handling middleware
    // next(err);
  }
};

module.exports = { test15 };