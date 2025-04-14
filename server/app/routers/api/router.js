const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const { verifyToken } = require("../../middleware/auth");
router.use(verifyToken);

const loginRouter = require("./login/router");
router.use("/login", loginRouter);

const userRouter = require("./user/router");
router.use("/user", userRouter);

const friendRouter = require("./friend/router");
router.use("/friend", friendRouter);

const settings = require("./settings/router");
router.use("/settings", settings);

const { sendEmail } = require("../../services/emailService");
router.get('/send-email', (req, res) => {
    sendEmail();
    res.send('La fonction a été appelée avec succès !');});

    /* ************************************************************************* */

const { authorize } = require("../../middleware/auth");
router.get("/auth", authorize);
    
module.exports = router;
