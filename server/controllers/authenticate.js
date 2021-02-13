const User = require("../models/user");

const login = async (req, res, next) => {
  try {
    const email = await User.find({ email: req.user.emails[0].value });
    if (email.length && email[0].email === req.user.emails[0].value) {
      res.status(200).send({
        displayName: req.user.displayName,
        email: req.user.emails[0].value,
        avatar: req.user.photos[0].value,
      });
    } else {
      const user = new User({
        name: req.user.displayName,
        email: req.user.emails[0].value,
      });

      const newUser = await user.save();
      if (newUser) {
        res.status(200).send({
          displayName: req.user.displayName,
          email: req.user.emails[0].value,
          avatar: req.user.photos[0].value,
        });
      } else {
        throw Error("User is not created, Please try again later.");
      }
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};
module.exports = {
  login,
};
