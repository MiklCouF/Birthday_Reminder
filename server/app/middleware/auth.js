const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// verify if the token of the user is still valid
const authorize = (req, res) => {
  const authtoken = req.cookies.authtoken;
  if (!authtoken) {
    res.sendStatus(404);
    return;
  }

  jwt.verify(authtoken, process.env.APP_SECRET, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(202);
    }
  });
};

const verifyToken = (req, res, next) => {
    const publicRoutes = ['/login/login', '/login/register']; // Ajoutez ici toutes les routes non protégées
    if (publicRoutes.includes(req.path)) {
      return next(); // Ignore la vérification pour ces routes
    }
  const token = req.cookies.authtoken;
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
      return;
    }
    req.user = decoded; // Store the decoded token in the request object
    next();
  });
};

module.exports = {
    authorize,
    verifyToken,
};