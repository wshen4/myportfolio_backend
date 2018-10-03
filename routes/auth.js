const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Joi = require("Joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return status(400).send("Invalid Email or Password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return status(400).send("Invalid Email or Password.");

  const token = user.generateAuthToken();

  res.send(token);
});

function validate(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(500)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1000)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports = router;
