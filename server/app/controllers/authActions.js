const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {

      console.log('%c⧭', 'color: #731d1d', "authAction, HashPassword argon");
      req.body.password = hashedPassword;
      next();
    })
    .catch((err) => {
      
      console.log('%c⧭', 'color: #b90a04', "ici c'est erreur de hashPassword");
      console.error(err.message);
      res.sendStatus(500);
    });
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    console.error(err);
    return false;
  }
};

const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmail(req.body.email);

    if (!user) {
      res.sendStatus(401);
      return;
    }

    const isPasswordVerified = await verifyPassword(
      req.body.password,
      user.password
    );
    if (!isPasswordVerified) {
      res.sendStatus(401);
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        firstname: user.firstname,
        email: user.email,
      },
      process.env.APP_SECRET,
      { expiresIn: "24h" }
    );

    delete user.password;

    if (token)
      res.cookie('authtoken', token, {
        httpOnly: true, // Accès uniquement par le back-end, pas par le JavaScript du navigateur
        secure: false,   // true pour utiliser uniquement sur HTTPS
        sameSite: 'strict', // Empêche l'envoi du cookie via des requêtes cross-site
        maxAge: 24 * 60 * 60 * 1000 // Durée de vie du cookie (24h)
    });
    res.status(200).send('Cookie set');

  } catch (err) {
    next(err);
  }
};

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer") {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.APP_SECRET, (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      next();
    }
  });
};

module.exports = {
  login,
  hashPassword,
  authorize,
};
