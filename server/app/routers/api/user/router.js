const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const { read, edit } = require("../../../controllers/userActions");

// Route to get a specific user by ID
router.get("/:id", read);

// Route to edit a user
router.put("/:id", edit);


/* ************************************************************************* */

module.exports = router;
