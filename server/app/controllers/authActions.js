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
    { expiresIn: "24h" }
  );
};

const verifyPassword = async (password, hashedPasswordDB) => {
// get the password from the front login, and the hash password from the DB for verify with argon2
  try {
   const valid = await argon2.verify(hashedPasswordDB, password)

   console.log('%c⧭', 'color: #1d3f73', "valid de argon2verify", valid );
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

  console.log('%c⧭', 'color: #364cd9', "password body", password);
  console.log('%c⧭', 'color: #408059', "bienvenu dans login server");
  try {
    console.log('%c⧭', 'color: #735656', "on arrive dans login, body:", "email :", email);
    const user = await tables.user.getUser(email);

    console.log('%c⧭', 'color: #00ff88', "reponse du server, voici user:", user);
    if (!user) {
      
      console.log('%c⧭', 'color: #ffcc00', "pas de user ici :", user);
      res.sendStatus(401);
      return;
    }

    const isPasswordVerified = await verifyPassword(password, user.hashedPasswordDB);
    if (!isPasswordVerified) {

      res.sendStatus(401);
      return;
    }
// TODO récupérer les donnée de la bdd pour transmettre l'id firstname, et token?

    const id = user.id; // ID de l'utilisateur
    const firstname = user.firstname; // Le prénom de l'utilisateur
    const token = generateToken(user);
    delete user.password;
    
    console.log('%c⧭', 'color: #d0bfff', "voyons user", id, firstname, token);
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


// verify if the token of the user is still valid
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

