const { login } = require("../controllers/authenticate");
const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_HOME_PAGE_URL,
    failureRedirect: "/login",
  })
);

router.get("/auth/login", login);

module.exports = router;
