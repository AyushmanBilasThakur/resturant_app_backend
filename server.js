require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Datastore = require('nedb')
const path = require('path')

const db = new Datastore({filename: path.join(__dirname ,"menu.db")})

db.loadDatabase(err => {
    if(err)
        console.log(err)
    console.log("DB got connected")
})

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get("/api/menu", (req, res) => {
    db.find({},(err, docs) => {
        if(!err)
            res.send(docs)
        else
            res.statusCode(500).send({err})
    })
})

app.post("/api/menu", (req, res) => {
    var doc = {
        "availabletime": req.body.availabletime,
        "category": req.body.category,
        "description": req.body.description || "",
        "name": req.body.name,
        "price": req.body.price,
        "vegflag": req.body.vegflag
    }
    db.insert(doc, (err, newDoc) => {
        if(!err)
            res.send(newDoc)
        else
            res.statusCode(500).send(err)
    })
})

app.listen(PORT, () => {
    console.log("Server Running on port",PORT)
})