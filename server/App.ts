import express, { Application, Request, Response, NextFunction } from 'express';
const fileUpload = require("express-fileupload");
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
const port = 3088

const routes = require('./src/Route')

app.use('/auth', routes)

app.listen(port, () =>{
    console.log(`Server is running in ${port}...`)
})
