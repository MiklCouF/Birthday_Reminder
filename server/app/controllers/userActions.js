// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const user = await tables.user.readAll();
    // Respond with the items in JSON format
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Read for Login

const readByEmail = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.read(req.params.email);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with next, for authAction to creat token
    if (user == null) {
      res.sendStatus(404);
    } else {
      next();
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Get email for send rimender

const readEmailById = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readEmailById(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with next, for authAction to creat token
    if (user == null) {
      res.sendStatus(404);
    } else {
      next();
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};


// The E of BREAD - Edit (Update) operation
const edit = async (req, res) => {
  try {
    const body = {
      id : req.params.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    }

    const updateUser = await tables.user.update(body);

    if (updateUser === 1){
      res.sendStatus(204);
    } else {
      res.status(404).send("La mise à jour de l'utilisateur est impossible");
    }
  } catch (err){
    console.error(err)
  }
}

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const user = req.body;

  try {

    // Insert the item into the database
    const insertId = await tables.user.create(user);
    
    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  readByEmail,
  readEmailById,
  // destroy,
};
