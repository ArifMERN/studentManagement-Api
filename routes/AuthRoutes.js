const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");

router.post("/signUp", AuthController.signup);

router.post("/signin", AuthController.signin);

module.exports = router;
