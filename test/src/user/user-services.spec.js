const userService = require('../../../app/src/user/user-services');
const User = require('../../../app/src/user/user-model');
const {CODE, WORDING} = require("../../../app/utils/response");

describe('userService', () => {
  describe('#findUser', () => {
    it('should return list data and code OK when input without payload', async () => {
      const expectedResult = {
        code: CODE.OK,
        data: []
      }
      User.find = jest.fn().mockReturnValue([]);

      const result = await userService.findUser()

      expect(result).toEqual(expectedResult)
    });

    it('should return list data and code OK when input with payload identityNumber and AccountNumber', async () => {
      const expectedResult = {
        code: CODE.OK,
        data: []
      }
      const payload = {
        identityNumber: 100,
        accountNumber: 123
      }
      User.find = jest.fn().mockReturnValue([]);

      const result = await userService.findUser(payload)

      expect(result).toEqual(expectedResult)
    });
  });

  describe('#updateUser', () => {
    it('should return bad request code and user id not found when findById return null', async () => {
      const expectedResult = {
        code: CODE.BAD_REQUEST,
        data: WORDING.USER_NOT_FOUND
      }
      User.findById = jest.fn().mockReturnValue(null);

      const result = await userService.updateUser({}, '123456789101')

      expect(result).toEqual(expectedResult)
    });

    it('should return ok code when findById return value', async () => {
      const expectedResult = {
        code: CODE.OK,
        data: WORDING.USER_UPDATED
      }
      User.findById = jest.fn().mockReturnValue({});

      const result = await userService.updateUser({}, '123456789101')

      expect(result).toEqual(expectedResult)
    });

    it('should return internal error code when findById return value but updateOne got error', async () => {
      const expectedResult = {
        code: CODE.INTERNAL_ERROR,
        data: WORDING.USER_UPDATE_FAILED
      }
      User.findById = jest.fn().mockReturnValue({});
      User.updateOne = jest.fn().mockRejectedValue({});

      const result = await userService.updateUser({}, '123456789101')

      expect(result).toEqual(expectedResult)
    });
  });

  describe('#deleteUser', () => {
    it('should return bad request code and user id not found when findById return null', async () => {
      const expectedResult = {
        code: CODE.BAD_REQUEST,
        data: WORDING.USER_NOT_FOUND
      }
      User.findById = jest.fn().mockReturnValue(null);

      const result = await userService.deleteUser('123456789101')

      expect(result).toEqual(expectedResult)
    });

    it('should return ok code when findById return value', async () => {
      const expectedResult = {
        code: CODE.OK,
        data: WORDING.USER_DELETED
      }
      User.findById = jest.fn().mockReturnValue({});
      User.deleteOne = jest.fn().mockReturnValue({});

      const result = await userService.deleteUser('123456789101')

      expect(result).toEqual(expectedResult)
    });

    it('should return internal error code when findById return value but updateOne got error', async () => {
      const expectedResult = {
        code: CODE.INTERNAL_ERROR,
        data: WORDING.USER_DELETE_FAILED
      }
      User.findById = jest.fn().mockReturnValue({});
      User.deleteOne = jest.fn().mockRejectedValue({});

      const result = await userService.deleteUser('123456789101')

      expect(result).toEqual(expectedResult)
    });
  });
});
