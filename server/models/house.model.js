import mongoose from 'mongoose'

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  square: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  isSell: {
    type: Boolean,
    default: false
  },
  isRent: {
    type: Boolean,
    default: false
  },
  sellPrice: {
    type: Number,
    default: 0
  },
  rentPrice: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  }
})

export default mongoose.model('House', schema)
