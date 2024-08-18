// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  const userId = req.cookies.id;
  if (!userId){
    return res.status(401).json({ message: 'User not found, access denied' });
}
  try {
    // Fetch all items from the database
    const friends = await tables.friend.readAll(userId);

    // Respond with the items in JSON format
    res.json(friends);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The B of BREAD - readMonth
const ReadMonthFriend = async (req, res, next) => {
  const userId = req.cookies.id;
  if (!userId){
    return res.status(401).json({ message: 'User not found, access denied' });
}
  try {
    // Fetch all items from the database
    const friends = await tables.friend.readMonth(userId);

    // Respond with the items in JSON format
    res.json(friends);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};


// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const friend = await tables.friend.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (friend == null) {
      res.sendStatus(404);
    } else {
      res.json(friend);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const friend = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.friend.create(friend);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    res.status(405).send({
      msg: "Erreur, le proche n'a pas était enregistrée dans la base de données"
  })
}
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  ReadMonthFriend,
  read,
  // edit,
  add,
  // destroy,
};
