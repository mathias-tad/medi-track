export const authorized = (...allowedUsers) => {
  return (req, res, next) => {
    if (!allowedUsers.includes(req.user.position))
      return res.status(403).json({ message: "Access denied!!" });
    next();
  };
};
