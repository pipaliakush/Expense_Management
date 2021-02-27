const { login, logout } = require("../controllers/authenticate");
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
    successRedirect: process.env.CLIENT_URL + process.env.CLIENT_HOME_PAGE,
    failureRedirect: "/login",
  })
);

router.get("/auth/login", login);

router.post("/auth/logout", logout);

module.exports = router;
