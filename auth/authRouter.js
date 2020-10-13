const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const server = require("../api/server");

const router = require("express").Router();
const config = require("../api/config.js");

const Users = require("../users/usersModel.js");
const { isValid } = require("../users/usersService.js");
const { findById } = require("../users/usersModel.js");

// register
router.use("/register", (req, res) => {
  const credentials = req.body;
  console.log(credentials);

  if (isValid(credentials)) {
    const rounds = Number(process.env.HASH_ROUNDS || 6);
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        res.status(201).json({ data: user });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username & password. The password should be alphanumeric.",
    });
  }
});

//login
router.use("/login", (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
  if (isValid(req.body)) {
    Users.findBy({ username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = getJwt(user);

          res.status(200).json({ message: "Welcome to our API", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username & password. The password should be alphanumeric.",
    });
  }
});

// get JWT
function getJwt(user) {
  const payload = {
    username: user.username,
    role: user.role,
  };

  const jwtOptons = {
    expiresIn: "8h",
  };

  return jwt.sign(payload, config.jwtSecret, jwtOptons);
}

module.exports = router;
