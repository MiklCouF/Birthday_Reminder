const express = require("express");

const router = express.Router();

// Import settings-user-related actions
const { read, browse, edit } = require("../../../controllers/settingsActions");

// Route to get all user settings
router.get("/", browse);

// Route to get a specific user setting by ID
router.get("/:id", read);

// Route to change the user settings
router.put("/", edit);

/* ************************************************************************* */

module.exports = router;
