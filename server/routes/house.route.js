import express from 'express'
import auth from '../services/auth'
import HouseController from '../controllers/house.controller'

export const houseRouter = express.Router()

houseRouter.route('/:id')
  .all(HouseController.getHouse)
  .get(HouseController.get)
  .delete(auth, HouseController.remove)
  .patch(auth, HouseController.patch)
  .put(auth, HouseController.put)
