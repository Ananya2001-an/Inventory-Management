require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Category = require('./models/category')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})

const db = mongoose.connection

db.on('error', (err) => console.log(err))
db.once('open', ()=> console.log('Connected to MongoDB Atlas'))

app.get('/showcategory/:id', (req, res)=>{
    Category.find({id: req.params.id})
    .then((response)=>{
        res.json(response)
    }).catch(e => res.json(e))
})

app.post('/createcategory', async (req, res)=>{
    const newCategory = new Category({
        name: req.body.name,
        desc: req.body.desc,
        id: req.body.id
    })

    try{
        await newCategory.save()
        res.json("Created Category")
    }catch{
        res.json("Failed to create Category")
    }
})

app.post('/deletecategory', (req,res)=>{
    const id = req.body.id
    const name = req.body.name
    Category.findOneAndDelete({id: id, name: name})
    .then(res.json("Deleted Category"))
})

app.listen(process.env.PORT || 5000)