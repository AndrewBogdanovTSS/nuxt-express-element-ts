import HouseModel from '../models/house.model'
import Hateaos from '../hateoas/houses.hateoas'

function getHouse(req, res, next) {
  /* for (let i = 0; i < data.flats.length; i++) {
     if(data.flats[i].id === parseInt(req.params.id)) {
       res.status(200);
       res.json(data.flats[i]);
       return;
     }
   }
   res.status(404);
   res.send(`Flat #${req.params.id} not found`)*/
  /* try {
     const house = await HouseModel.findById(req.params.id);
     if(house) {
       req.house = house;
     } else {
       res.status(404).send('No house found');
     }
     next()
   } catch(err) {
     res.status(500).send(err)
   }*/
  HouseModel.findById(req.params.id)
    .then(house => {
      if (house) {
        req.house = house
      } else {
        res.status(404).send('No house found')
      }
      next()
    })
    .catch(err => res.status(500).send(err))
}

function get(req, res) {
  let newHouse = req.house.toJSON()
  newHouse.links = Hateaos.linkHouse(req, newHouse)
  res.status(200).json(newHouse)
}

function remove(req, res) {
  req.house.remove()
    .then(() => res.sendStatus(204))
    .catch(err => res.status(500).send(err))
}

function patch(req, res) {
  if (req.body._id) delete req.body._id
  for (let key of req.body) req.house[key] = req.body[key]
  updateHouse(req, res)
}

function put(req, res) {
  if (req.body._id) delete req.body._id
  for (let key of req.body) req.house[key] = req.body[key]
  saveHouse(req, res)
}

function updateHouse(req, res) {
  /*const _id = req.params.id
  if(req.body._id) delete req.body._id;
  const house = {...req.body};*/
  if (req.body._id) delete req.body._id
  req.house.update({$set: {...req.body}})
    .then(() => res.status(200).send('true'))
    .catch(err => res.status(500).send(err.message))
}

function saveHouse(req, res) {
  req.house.save()
    .then((house) => {
      res.status(201)
      res.json({
        status: `House was saved successfully`,
        house
      })
    })
    .catch((err) => {
      res.status(400)
      res.send(err.message)
    })

}

export default {get, getHouse, remove, patch, saveHouse, put}
