function requireUser(req, res, next) {
    if (!req.user) {
      res.status(401);
      next({
          name: "MissingUserError",
          message: "You must be logged in to perform this action"
      });
  }
  next(); 
};

function requireAdmin(re, res, next) {
    if (!req.user.isAdmin) {
        next({
            name: "NotAdmin",
            message: "You must be an admin to perform this action"
        });
    }
    next();
}

module.exports = {
    requireUser,
    requireAdmin
}