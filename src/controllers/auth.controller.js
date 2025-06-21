const register = async (req, res) => {
  const user = req.user;
  res.json201(user);
};
const login = async (req, res) => {
  const { token, user } = req;
  const opts = {
    httpOnly: true, // 🔒 Protege contra XSS
    secure: process.env.NODE_ENV === "production", // 🔒 Solo HTTPS en prod
    sameSite: "Strict", // 🔒 Protege contra CSRF
    maxAge: 60 * 60 * 24 * 7 * 1000 // 7 días
  };
 res.cookie("token", token, opts).status(200).json({
  response: user,
  message: "Logged in",
});
};
const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "Logout success"
  });
};

export { register, login, logout};