var express = require("express");
var router = express.Router();
const uid2 = require("uid2");
require("../models/connection");
const User = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  User.findOne({ username: req.body.username }).then((data) => {
    const hash = bcrypt.hashSync(req.body.password, 10);

    if (data === null) {
      const token = uid2(32);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: token,
      });

      newUser.save().then(() => {
        res.json({ result: true, token: token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  User.findOne({ username: req.body.username }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

module.exports = router;
