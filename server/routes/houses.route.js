import express from 'express'
import auth from '../services/auth'
import HousesController from '../controllers/houses.controller'

export const housesRouter = express.Router()

housesRouter.route('/')
  .get(HousesController.get)
  .post(auth, HousesController.uploadImage(), HousesController.post)
