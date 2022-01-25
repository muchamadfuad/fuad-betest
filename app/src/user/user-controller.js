const userService = require("./user-services")

const getUsers = async (req, res) => {
  const response = await userService.findUser(req.query);
  res.status(200).json(response.data);
}

const createUser = async (req, res) => {
  const response = await userService.createUser(req.body)
  console.log(response)
  return res.status(response.code).json(response.data);
}

const updateUser = async (req, res) => {
  const response = await userService.updateUser(req.body, req.params.id)
  return res.status(response.code).json(response.data);
}

const deleteUser = async (req, res) => {
  const response = await userService.deleteUser(req.params.id)
  return res.status(response.code).json(response.data);
}

module.exports = {deleteUser, getUsers, createUser, updateUser}
