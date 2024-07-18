const User = require("../../models/User");
const bcrybt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const hashedPassword = await bcrybt.hash(password, 10);
  return hashedPassword;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });
  return token;
};

exports.register = async (req, res, next) => {
  try {
    const existingUserEmail = await User.findOne({ email: req.body.email });
    if (existingUserEmail) {
      return res.status(403).json("This email is already in use!");
    }
    req.body.password = await hashPassword(req.body.password);
    const newUser = await User.create({
      email: req.body.email,

      password: req.body.password,
    });

    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
