const jwt = require('jsonwebtoken');
const {CODE} = require("../utils/response");
require('dotenv').config();


const secret = process.env.SECRET

const createToken = async (req, res) => {
  const token = await generateToken();
  const result = {
    token: token
  }
  res.status(CODE.OK).json(result);
}

const generateToken = async () =>{
  const token = jwt.sign({}, secret, {expiresIn: 3600})
  return token;
}

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader)
    return res.status(CODE.FORBIDDEN).send("No token provided");
  if (tokenHeader.split(' ')[0] !== 'Bearer')
    return res.status(CODE.FORBIDDEN).send("Incorrect token format");
  const token = tokenHeader.split(' ')[1];
  if (!token)
    return res.status(CODE.FORBIDDEN).send("No token provided");
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {return res.status(CODE.FORBIDDEN).send("Token invalid")}
    next();
  });
}

module.exports = {verifyToken, createToken}
