const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use("/api", loginRouter);

server.get("/", (req, res) => {
  res.json({ api: "is up" });
});

module.exports = server;
