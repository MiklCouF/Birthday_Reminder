const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

// Need a route for : user , friend birthday 

const userRouter = require("./user/router");

router.use("/user", userRouter);

const { login } = require("../../controllers/authActions")
const { credentialsValidation } = require("../../services/credentialValidation");

router.post("/login", credentialsValidation, login);

const friendRouter = require("./friend/router");

router.use("/friend", friendRouter);

/* ************************************************************************* */

module.exports = router;
