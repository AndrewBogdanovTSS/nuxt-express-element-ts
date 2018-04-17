import UserModel from '../models/user.model'
import Hateaos from '../hateoas/users.hateoas'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config.json'

function signUp(req, res) {
  UserModel.findOne({email: req.body.email})
    .then(user => {
      const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      if (user) return res.status(409).send('User already exists')
      if (!req.body.password.match(regularExpression)) return res.status(401).send('Password should have 6 to 16 valid characters and contain at least one number, uppercase letter and one special character')
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.status(500).send(err.message)
        const newUser = new UserModel({email: req.body.email, password: hash})
        newUser.save()
          .then(result => res.status(201).send('User created!'))
          .catch(err => res.status(500).send(err.message))
      })

    })
    .catch(err => res.status(500).send(err.message))
}

function login(req, res) {
  UserModel.findOne({email: req.body.email})
    .then(user => {
      if (!user) return res.status(401).send('Authorization failed!')
      bcrypt.compare(req.body.password, user.password, (err, isValid) => {
        if (isValid) {
          const token = jwt.sign(
            {email: user.email, id: user._id},
            config.dev.jwtKey,
            {expiresIn: '1h'})
          res.status(200).json({
            message: 'Authorization successful',
            token
          })
        } else {
          res.status(401).send('Authorization failed!')
        }
      })
    })
    .catch(err => res.status(500).send(err.message))
}

function get(req, res) {
  UserModel.findById(req.params.id)
    .select('-__v')
    .lean()
    .then(user => {
      Hateaos.linkUser(req, user)
      res.status(200).json(user)
    })
    .catch(err => res.status(500).send(err.message))
}

function removeById(req, res) {
  UserModel.findById(req.params.id)
    .then(user => {
      if (user) {
        user.remove()
          .then(result => res.status(200).send('User deleted!'))
          .catch(err => res.status(500).send(err.message))
      }

    })
    .catch(err => res.status(500).send(err.message))
}

function removeByEmail(req, res) {
  UserModel.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        UserModel.remove({email: user.email})
          .then(result => res.status(200).send('User deleted!'))
          .catch(err => res.status(500).send(err.message))
      } else {
        res.status(404).send('No user found')
      }
    })
    .catch(err => res.status(500).send(err.message))
}

export default {signUp, login, get, removeById, removeByEmail}
