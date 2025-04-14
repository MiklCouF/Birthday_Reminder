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

      req.body.password = hashedPassword;
      next();
    })
    .catch((err) => {
      
      console.error(err.message);
      res.sendStatus(500);
    });
};


function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      firstname: user.firstname,
      email: user.email,
    },
    process.env.APP_SECRET,
    { expiresIn: "36h" }
  );
};

const verifyPassword = async (password, hashedPasswordDB) => {
// get the password from the front login, and the hash password from the DB for verify with argon2
  try {
   const valid = await argon2.verify(hashedPasswordDB, password)
   return valid
  } catch (err) {
    console.error("error sur argon2verify", err);
    return false;
  }
};

// Primary function for verify if the email exist and the compare password from the front submit and hashed password from database
const login = async (req, res, next) => {
  const email = req.body.email;
const password = req.body.password;

  try {
    const user = await tables.user.getUser(email);
    if (!user) {
            res.sendStatus(401);
      return;
    }

    const isPasswordVerified = await verifyPassword(password, user.hashedPasswordDB);
    if (!isPasswordVerified) {

      res.sendStatus(401);
      return;
    }

    const id = user.id; // ID de l'utilisateur
    const firstname = user.firstname; // Le prénom de l'utilisateur
    const token = generateToken(user);
    delete user.password;
    
    // initialisation du cookie pour le token JWT
    if (token)
      res.cookie('authtoken', token, {
        httpOnly: true, // Accès uniquement par le back-end, pas par le JavaScript du navigateur
        secure: false,   // true pour utiliser uniquement sur HTTPS
        sameSite: 'strict', // Empêche l'envoi du cookie via des requêtes cross-site
        maxAge: 24 * 60 * 60 * 1000 // Durée de vie du cookie (24h)
    });

    // Configurer un cookie pour le id
res.cookie('id', id, {
  httpOnly: false, // Accès depuis le JavaScript du navigateur
  secure: false,   // true pour utiliser uniquement sur HTTPS
  sameSite: 'strict', // Empêche l'envoi du cookie via des requêtes cross-site
  maxAge: 24 * 60 * 60 * 1000 // Durée de vie du cookie (24h)
});

// Configurer un cookie pour le firstname
res.cookie('firstname', firstname, {
  httpOnly: false, // Accès depuis le JavaScript du navigateur
  secure: false,   // true pour utiliser uniquement sur HTTPS
  sameSite: 'strict', // Empêche l'envoi du cookie via des requêtes cross-site
  maxAge: 24 * 60 * 60 * 1000 // Durée de vie du cookie (24h)
});

    res.status(200).send('Cookie set');

  } catch (err) {
    console.log('%c⧭', 'color: #99adcc', "oups, une erreur dans login catch :", err);
    next(err);
  }
};

module.exports = {
  login,
  hashPassword,
};

