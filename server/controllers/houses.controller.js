import HouseModel from '../models/house.model'
import HouseController from './house.controller'
import Hateaos from '../hateoas/houses.hateoas'
import Helpers from '../helpers'
import multer from 'multer'

function get(req, res) {
  const filtersArr = ['isRent', 'isSell', 'price']
  // const select = req.query.select || '';
  /*  try{
      const houses = await HouseModel.find(Helpers.mapObj(filtersArr, req.query))
        .select('-__v')
        .lean();
      houses.forEach((house, i, arr)=>{
        Hateaos.linkHouses(req, house);
      });
      res.status(200).json(houses);
    } catch(err) {
      res.status(500).send(err);
    }*/

  HouseModel.find(Helpers.mapObj(filtersArr, req.query))
    .select('-__v')
    .lean()
    .then(houses => {
      houses.forEach((house, i, arr) => {
        Hateaos.linkHouses(req, house)
      })
      res.status(200).json(houses)
    })
    .catch(err => res.status(500).send(err))
}

function post(req, res) {
  req.house = new HouseModel({...req.body, image: req.file.path})
  HouseController.saveHouse(req, res)
}

function uploadImage() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads')
    },
    filename(req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
  const uploader = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter(req, file, cb) {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
      } else {
        cb(new Error(`Unsupported file type: ${file.mimetype}`), false)
      }
    }
  })
  return uploader.single('houseImage')
}

export default {get, post, uploadImage}
