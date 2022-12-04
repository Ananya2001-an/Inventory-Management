const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      unique: true
    },
    desc:{
      type: String,
      required: true
    },
    createdOn:{
        type: Date,
        required: true,
        default: new Date()
    },
    id:{
      type: String,
      required: true
    }
})

module.exports = mongoose.model('Category', categorySchema)