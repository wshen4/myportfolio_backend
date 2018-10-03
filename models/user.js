const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 500,
    unique: true
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
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

exports.User = User;
exports.validate = validateUser;
