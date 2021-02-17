const login = async (req, res, next) => {
  try {
    res.status(200).send({
      displayName: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
    });
  } catch (error) {
    res.status(401).send({
      error,
    });
  }
};
module.exports = {
  login,
};
