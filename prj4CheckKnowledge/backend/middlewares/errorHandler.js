const ErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let success = false
  let message = err.message || 'server error'
  console.error(`Error: ${message}, Status Code: ${statusCode}`)
  res.status(statusCode).json({
    success,
    message,
  })
}

export default ErrorHandler
