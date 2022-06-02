const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { string } = require("joi");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  firstName: { type: string, required: true },
  lastName: { type: string, required: true },
  email: { type: string, required: true },
  password: { type: string, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};
const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    firstName: Joi.string().email().required().label("Email"),
    firstName: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
