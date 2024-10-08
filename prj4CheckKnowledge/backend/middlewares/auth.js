import jwt from 'jsonwebtoken'
import ErrorResponse from '../utils/error.js'

export const Protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new ErrorResponse('No token, authorization denied', 401))
  }

  try {
    console.log('Received token:', token)

    const decoded = jwt.verify(token, 'asdfASD#$%@#234DFGVBas$%')

    console.log('Decoded token:', decoded)

    req.user = decoded

    next()
  } catch (error) {
    console.error('Token verification failed:', error.message)
    return next(new ErrorResponse('Not authorized, token failed', 401))
  }
}
