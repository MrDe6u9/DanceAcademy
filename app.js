const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');}
const fs = require("fs");
const bodyparser = require("body-parser")
const app = express();
const port = 80;

// Define moggose schema
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
const contact = mongoose.model('contact', contactschema );

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

// ye code data ko save kar raha hai
app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been save to the database")
    }).catch(()=>{
        res.status(400).send("item was not send to the database")
    })

    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})