// To check and make sure user is logged-in
function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }
  next();
}

// To check and make sure user isAdmin
function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).send({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  } else if (!req.user.isAdmin) {
    return res.status(403).send({
      name: "NotAdmin",
      message:
        "You must be an admin to access this information or perform this action",
    });
  }
  next();
}

// takes required parameters as an array, returns a middleware function that sends back a message if they're not present
const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
  return (req, res, next) => {
    // for operations that need at least one param. Not all required.
    if (atLeastOne) {
      let numParamsFound = 0;
      for (let param of requiredParams) {
        if (req.body[param] !== undefined) {
          numParamsFound++;
        }
      }
      if (!numParamsFound) {
        next({
          name: "MissingParams",
          message: `Must provide at least one of these in body: ${requiredParams.join(
            ", "
          )}`,
        });
      } else {
        next();
      }
    } else {
      // figure out which ones are not defined, and return them
      const notSent = [];
      for (let param of requiredParams) {
        if (req.body[param] === undefined) {
          notSent.push(param);
        }
      }
      if (notSent.length)
        next({
          name: "MissingParams",
          message: `Required Parameters not sent in body: ${notSent.join(
            ", "
          )}`,
        });
      next();
    }
  };
};

module.exports = {
  requireUser,
  requireAdmin,
  requiredNotSent,
};
