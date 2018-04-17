import jwt from 'jsonwebtoken'
import config from '../config.json'

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, config.dev.jwtKey)
    req.userData = decoded
    console.log('decoded:', decoded)
    next()
  } catch (err) {
    return res.status(401).send(err.message)
  }

}


