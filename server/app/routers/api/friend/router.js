const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import friend-related actions
const { browse, read, add } = require("../../../controllers/friendActions");

// Route to get a list of friends
router.get("/", browse);

// Route to get a specific friend by ID
router.get("/:id", read);

// Route to add a new friend
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
