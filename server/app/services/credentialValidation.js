const credentialsValidation = (req, res, next) => {

  console.log('%c⧭', 'color: #ffa640', "ici on arrive dans credentialsValidation");
  const { email, password } = req.body;
  if (!email || !password) {
    res.sendStatus(401);

    return;
  }
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  const isPasswordValid = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/.test(password);
  if (!isEmailValid || !isPasswordValid) {
    res.sendStatus(401);
    return;
  }

  next();
};

module.exports = {
  credentialsValidation,
};
