const express = require('express');
const bodyParser = require('body-parser');
var ciudadano = require('../models/ciudadano');

const CiudadanoRouter = express.Router();

CiudadanoRouter.use(bodyParser.json());

CiudadanoRouter.route('/')
//CiudadanoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
}) 
.get((req,res,next) => {
    //res.end('Este metodo retornara la lista de ciudadanos'+req.params.CiudadanoId);
    res.end('Este metodo retornara la lista de ciudadanos');
}) 
.post((req, res, next) => {
    res.end('Se agregara el ciudadano ' + req.body.name + ' que vive en : ' + req.body.address);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('el metodo PUT no es soportado en  /ciudadanos');
})
.delete((req, res, next) => {
    res.end('Eliminando todos los ciudadanos');
});
CiudadanoRouter.route('/:ciudadanoId')
//CiudadanoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    //res.end('Este metodo retornara la lista de ciudadanos'+req.params.ciudadanoId);
    res.end('Este metodo retornara la lista de ciudadanos'+req.params.ciudadanoId);
})
CiudadanoRouter.route('/grupo/:ciudadanoId')
//CiudadanoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    //res.end('Este metodo retornara la lista de ciudadanos'+req.params.ciudadanoId);
    res.end('aaaaatodo retornara la lista de ciudadanos'+req.params.ciudadanoId);
})
CiudadanoRouter.route('/registro')
//CiudadanoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    //res.end('Este metodo retornara la lista de ciudadanos'+req.params.ciudadanoId);
    res.end('ggg metodo retornara la lista de ciudadanos');
})
/*.post('/registro',(req, res, next) => {
    ciudadano.create(req.body,(err,ciudadano) => {
        if(err){next(err)}
        else{
            var ok={
                estado:"ok",
                id:ciudadano._id
            }
            res.json(ok);
        }
    })
})*/
module.exports = CiudadanoRouter;