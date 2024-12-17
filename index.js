const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const config = require('./config/db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

config.connectionDB();

app.use('/api',routes)
app.listen(8000,() =>{
    console.log('ayaktayiz');
})
