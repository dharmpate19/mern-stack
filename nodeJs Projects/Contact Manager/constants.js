// constants.js
const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const TITLES = {
  [STATUS.OK]: 'OK',
  [STATUS.CREATED]: 'Created',
  [STATUS.BAD_REQUEST]: 'Validation Error',
  [STATUS.UNAUTHORIZED]: 'Unauthorized',
  [STATUS.FORBIDDEN]: 'Forbidden',
  [STATUS.NOT_FOUND]: 'Not Found',
  [STATUS.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};

module.exports = { STATUS, TITLES };
