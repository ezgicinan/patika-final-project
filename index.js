const express = require('express');
const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',routes)
app.listen(8000,() =>{
    console.log('ayaktayiz');
})
