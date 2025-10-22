// errorHandler.js
const { STATUS, TITLES } = require('../constants');

const errorHandler = (err, req, res, next) => {
  // Use the status code set in the route, or default to 500
  const statusCode = res.statusCode && res.statusCode !== STATUS.OK
    ? res.statusCode
    : STATUS.INTERNAL_SERVER_ERROR;
  const title = TITLES[statusCode] || 'Error';

  res.status(statusCode).json({
    status: statusCode,
    title: title,
    message: err.message || title,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
