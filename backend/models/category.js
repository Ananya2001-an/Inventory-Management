const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    desc:{
      type: String,
      required: true
    },
    createdOn:{
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Category', categorySchema)