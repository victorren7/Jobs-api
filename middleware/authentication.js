const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnathenticatedError } = require('../errors')

const auth = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization

  if (!authHeader ||  !authHeader.startsWith('Bearer')) {
    throw new UnathenticatedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {userId: payload.userId, name: payload.name}
    next()
  } catch (err) {
    throw new UnathenticatedError('Authentication invalids')
  }
}

module.exports = auth