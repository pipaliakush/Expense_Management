const login = (req, res, next) => {
  res.status(200).send({
    displayName: req.user.displayName,
    email: req.user.emails[0].value,
    avatar: req.user.photos[0].value,
  });
};
module.exports = {
  login,
};
