const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import friend-related actions
const { browse, read, add, ReadMonthFriend, destroy } = require("../../../controllers/friendActions");

// Route to get a list of friends
router.get("/", browse);

// Route to get the list of friends birthday, for the current month
router.get("/month", ReadMonthFriend);

// Route to get a specific friend by ID
router.get("/:id", read);

// Route to add a new friend
router.post("/", add);

// Route to delete a specific friend by ID
router.delete("/:id", destroy)

/* ************************************************************************* */

module.exports = router;
