const login = async (req, res, next) => {
  try {
    res.status(200).send({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
    });
  } catch (error) {
    res.status(401).send({
      error,
    });
  }
};

const logout = async (req, res) => {
  req.logout();
  req.session = null;
  await res.clearCookie('auth');
  await res.clearCookie('auth.sig');
  return res.end();
};

module.exports = {
  login,
  logout,
};
