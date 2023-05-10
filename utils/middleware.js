const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body:', req.body)
  logger.info('______')
  next()
}

const tokenExtractor = (req, res, next) => {
  if(req.method === 'POST'|| req.method === 'DELETE'){
    const authorization = req.get('authorization')
    console.log('the auth middleware', authorization)
    if(authorization && authorization.startsWith('bearer ')){
      req.token = authorization.replace('bearer ', '')
      console.log('the request token', req.token)
      return next()
    }
    return null
  }
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  logger.info(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}
module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}