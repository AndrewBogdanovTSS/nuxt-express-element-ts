import UserModel from '../models/user.model'
import Hateaos from '../hateoas/users.hateoas'

function get(req, res) {
  UserModel.find()
    .select('-__v')
    .lean()
    .then(users => {
      users.forEach((user, i, arr) => {
        Hateaos.linkUsers(req, user)
      })
      res.status(200).json(users)
    })
    .catch(err => res.status(500).send(err))
}

export default {get}
