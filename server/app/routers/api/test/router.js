const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { conductorReminder } = require("../../../services/sendBirthdayService");

router.get("/", conductorReminder);

module.exports = router;