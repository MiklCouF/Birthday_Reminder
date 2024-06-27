const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

// Need a route for : user , friend birthday 

const userRouter = require("./user/router");

router.use("/user", userRouter);

const friendRouter = require("./friend/router");

router.use("/friend", friendRouter);

/* ************************************************************************* */

module.exports = router;
