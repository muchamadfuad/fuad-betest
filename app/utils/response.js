
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

module.exports = {
  wrapper,
  CODE
}
