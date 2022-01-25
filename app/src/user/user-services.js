const User = require("./user-model")
const mongoose = require('mongoose');
const response = require('../../utils/response')

class UserService {
  async createUser(payload) {
    try {
      const user = new User(payload);
      const savedUser = await user.save();
      return response.wrapper(savedUser, response.CODE.CREATED)
    } catch (error) {
      return response.wrapper(error.message, response.CODE.BAD_REQUEST)
    }
  }

  async findUser(payload) {
    if (!payload) {
      const users = await User.find();
      return response.wrapper(users, response.CODE.OK)
    }
    const query = {};
    if (payload.accountNumber)
      query.accountNumber = payload.accountNumber;
    if (payload.identityNumber)
      query.identityNumber = payload.identityNumber;
    const users = await User.find(query);
    return response.wrapper(users, response.CODE.OK)
  }

  async updateUser(payload, userId) {
    userId = mongoose.Types.ObjectId(userId)
    const user = await User.findById(userId);
    if (!user) return response.wrapper('user id not found', response.CODE.BAD_REQUEST)
    try {
      await User.updateOne({_id: userId}, {$set: payload});
      return response.wrapper('user has been updated', response.CODE.OK)
    } catch (error) {
      return response.wrapper('failed to update user', response.CODE.INTERNAL_ERROR)
    }
  }

  async deleteUser(userId) {
    userId = mongoose.Types.ObjectId(userId)
    const user = await User.findById(userId);
    if (!user) return response.wrapper('user id not found', response.CODE.BAD_REQUEST)
    try {
      await User.deleteOne({_id: userId});
      return response.wrapper('user has been deleted', response.CODE.OK)
    } catch (error) {
      return response.wrapper('failed to delete user', response.CODE.INTERNAL_ERROR)
    }
  }
}

module.exports = new UserService();
