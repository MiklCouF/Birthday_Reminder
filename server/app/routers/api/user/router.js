const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import user-related actions
const { read, add, edit } = require("../../../controllers/userActions");
const { credentialsValidation } = require("../../../services/credentialValidation");
const { hashPassword, login } = require("../../../controllers/authActions");

// Route to get a specific user by ID
router.get("/:id", read);

// Route to add a new user
router.post("/", credentialsValidation, hashPassword, add, login);

// Route to edit a user
router.put("/:id", edit);

/* ************************************************************************* */

module.exports = router;
