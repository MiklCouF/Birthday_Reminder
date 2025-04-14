const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { add } = require("../../../controllers/userActions");
const { credentialsValidation } = require("../../../services/credentialValidation");
const { hashPassword, login } = require("../../../controllers/authActions");


// Route to add a new user
router.post("/register", credentialsValidation, hashPassword, add, login);

// Route to login a user
router.post("/login", credentialsValidation, login);

module.exports = router;