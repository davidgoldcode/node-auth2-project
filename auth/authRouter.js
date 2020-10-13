const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const server = require("../api/server");

const router = require("express").Router();
// const config = require('../api/config.js');

// const Users = require('../users/usersModel.js');
const { isValid } = require("../users/users-service.js");

server.use("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = Number(process.env.HASH_ROUNDS || 6);
    const hash = bcryptjs.compareSync(credentials.password, rounds);
    credentials.password = hash;

    User.add(credentials)
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
