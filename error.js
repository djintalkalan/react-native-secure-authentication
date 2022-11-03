
const ERRORS = require('./data/errors')

function SecureAuthenticationError(name, details) {
  this.name = name || 'SecureAuthenticationError'
  this.message = details.message || 'Local Authentication Error'
  this.details = details || {}
}

SecureAuthenticationError.prototype = Object.create(Error.prototype)
SecureAuthenticationError.prototype.constructor = SecureAuthenticationError

export function createError(error) {
  let details = ERRORS[error]
  details.name = error

  return new SecureAuthenticationError(error, details)
}
