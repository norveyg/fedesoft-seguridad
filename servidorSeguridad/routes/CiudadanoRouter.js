const express = require('express');
const bodyParser = require('body-parser');

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
CiudadanoRouter.route('/grupo')
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
module.exports = CiudadanoRouter;