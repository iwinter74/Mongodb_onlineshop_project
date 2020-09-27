const express = require('express')
const mongoose = require('mongoose');
const ShopItem = require('./models/shopItem.js');
const app = express()
const port = 3000
require('dotenv').config()
let dbLength
let randomNum = []
let randomArr = [];
let newArr = [];
let randomWeekly = []

ShopItem.find()
    .then(result => {
        console.log(result.length)
        // console.log(result)
        dbLength = result.length
        while (randomNum.length < 6) {
            var r = Math.floor(Math.random() * dbLength);
            if (randomNum.indexOf(r) === -1) randomNum.push(r);
        }
        // console.log(randomNum);
        randomNum.forEach(element => {
            randomArr.push(result[element])
            // console.log(randomArr)
        });
        return randomArr
    })


app.use(express.urlencoded({ extended: false }))
app.use(express.json())



mongoose.connect(process.env.uridb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("databse connected")
        app.listen(process.env.PORT||port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    })
    .catch(err => console.log(err))

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
    ShopItem.find()
        .then(result => {
            // console.log(result)
            res.render('index', { items: result })
        })
        .catch(err => console.log(err))
})

app.get('/new', (req, res) => {
    res.render('newItem', { randomArr: randomArr })
})

app.get('/details/:id', (req, res) => {
    // console.log(req.params.id)
    ShopItem.findById(req.params.id)
        .then(result => {
            res.render('details', { item: result })
        })
        .catch(err => console.log(err))
})

app.get('/details/:id/delete', (req, res) => {
    console.log(req.params.id)
    ShopItem.findByIdAndDelete(req.params.id)
        .then(result => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

app.post('/new', (req, res) => {
    const newItem = new ShopItem({
        ['Product-picture-Link']: req.body.url,
        ['Product-name']: req.body.name,
        Company: req.body.company,
        Price: req.body.price,
        Description: req.body.text
    })
    newItem.save()
        .then(result => {
            console.log('new item saved')
            res.redirect('/')
        })
        .catch(err => console.log(err))
})

app.post('/details/:id/edit', (req, res) => {
    const updateItem = {
        ['Product-picture-Link']: req.body.url,
        ['Product-name']: req.body.name,
        Company: req.body.company,
        Price: req.body.price,
        Description: req.body.text
    }
    ShopItem.findByIdAndUpdate(req.params.id, updateItem)
        .then(result => {
            res.redirect(`/details/${req.params.id}`)
        })
        .catch(err => console.log(err))
})


ShopItem.find()
    .then(result => {
        result.forEach(element => {
            // element.Price = Number(element.Price.slice(1))
            if (Number(element.Price.slice(1)) < 30) {
                console.log(Number(element.Price.slice(1)))
                newArr.push(element)
            }
            // console.log(newArr)
        });
    })
    .catch(err => console.log(err))

app.get('/lessThan', (req, res) => {
    res.render('lessThan', { newArr: newArr })
})

app.get('/weekly', (req, res) => {
    ShopItem.find()
        .then(result => {
            console.log(result.length)
            let ranNum = []
            randomWeekly =[]
            while (ranNum.length < 6) {
                var r = Math.floor(Math.random() * result.length);
                if (ranNum.indexOf(r) === -1) ranNum.push(r);
            }
            // console.log('weekly:' + ranNum)
            ranNum.forEach(element => {
                randomWeekly.push(result[element])
            });
            // console.log(randomWeekly)
            res.render('weekly', { randomWeekly: randomWeekly })
        })
        .catch(err => console.log(err))
})






