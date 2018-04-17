import express from 'express'
import UserController from '../controllers/user.controller'
import UsersController from '../controllers/users.controller'
import auth from '../services/auth'

export const usersRouter = express.Router()

usersRouter.route('/')
  .get(UsersController.get)
  .delete(auth, UserController.removeByEmail)

usersRouter.route('/:id')
  .get(auth, UserController.get)
  .delete(auth, UserController.removeById)

usersRouter.route('/signup')
  .post(UserController.signUp)

usersRouter.route('/login')
  .post(UserController.login)
