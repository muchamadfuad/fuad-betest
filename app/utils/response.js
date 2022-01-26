
const wrapper = (data, code) => {
  return {
    data,
    code
  }
}

const CODE = {
  'BAD_REQUEST': 400,
  'INTERNAL_ERROR': 500,
  'FORBIDDEN': 403,
  'OK': 200,
  'CREATED': 201
};

const WORDING = {
  USER_NOT_FOUND: 'User id not found',
  USER_DELETED: 'User has been deleted',
  USER_DELETE_FAILED: 'Failed to delete user',
  USER_UPDATED: 'User has been updated',
  USER_UPDATE_FAILED: 'Failed to update user',
  TOKEN_INVALID: 'invalid token',
  TOKEN_NOT_PROVIDED: 'No token provided',
  TOKEN_INCORRECT_FORMAT: 'Incorrect token format'
}

module.exports = {
  wrapper,
  CODE,
  WORDING
}
