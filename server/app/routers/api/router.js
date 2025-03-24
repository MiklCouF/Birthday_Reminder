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

const settings = require("./settings/router");

router.use("/settings", settings);

const { sendEmail } = require("../../services/emailService");

router.get('/send-email', (req, res) => {
    sendEmail();
    res.send('La fonction a été appelée avec succès !');});
    /* ************************************************************************* */

const test = require("./test/router");

router.use("/test", test);
    
module.exports = router;
