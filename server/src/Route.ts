import express from 'express';
const router = express.Router();
const Functions = require('./Controllers');

router
    .get('/getAll', Functions.getAll)
    .post('/addUser', Functions.addUser)
    .post('/Login', Functions.Login)
    .post('/download', Functions.DownnloadArchive)
    .get('/getArchives', Functions.getArchives)
    .post('/delArchive', Functions.deleteArchive)
    .get('/LogOut', Functions.LogOut)

module.exports = router;