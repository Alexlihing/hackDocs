//insert logic to check if user is logged in and is sending a valid jwt token or passport validation
function authLog(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("Unauthorized");
}

module.exports = authLog;
