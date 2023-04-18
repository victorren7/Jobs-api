const BadRequestError = require('./bad-request');
const CustomAPIError = require('./custom-error');
const UnathenticatedError = require('./unauthenticated');
const NotFoundError = require('./not-found')

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnathenticatedError
}