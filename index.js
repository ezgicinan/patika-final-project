const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const config = require('./config/db');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

config.connectionDB();

// Allow CORS
app.use(cors({
    origin: 'http://localhost:5173', // Your React app's URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

//middleware - test
app.use('/test', function(req,res,next){
    console.log('Middleware')
    next();
    //res.status(200).send({success:true})
}, function(req,res){
    console.log('Controller')
    res.status(200).send({success:true})
})


app.use('/api',routes)
app.listen(8000,() =>{
    console.log('ayaktayiz');
})
