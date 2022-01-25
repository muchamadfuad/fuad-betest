const express = require("express")
const {deleteUser, getUsers, createUser, updateUser} = require("./src/user/user-controller")
const {createToken, verifyToken} = require("./auth/credential")

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', verifyToken, createUser);
router.put('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);
router.get('/token', createToken);

module.exports = router

