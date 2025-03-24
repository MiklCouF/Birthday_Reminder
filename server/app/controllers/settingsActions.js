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
    const settings = await tables.settings.readAll(userId);

    // Respond with the items in JSON format
    res.json(settings);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const setting = await tables.settings.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (setting == null) {
      res.sendStatus(404);
    } else {
      res.json(setting);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the item data from the request body
  const settings = req.body;
  // Extract user_id from cookies
  const userId = req.cookies.id;

  console.log('%c⧭', 'color: #735656', "userId", userId);
  // Add user_id to the settings object
  settings.user_id = userId;

  if (!userId){
    return res.status(401).json({ message: 'User not found, access denied' });
}
  try {
    // Update the item in the database
    const affectedRows = await tables.settings.update(settings);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 200 (OK)
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// TODO prendre les friends qui ont 15 en true
// verifier si ils ont date du jour = date de naissance - 15 jours
// si oui renvoyer l'user associé, le friends avec date
// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
};
