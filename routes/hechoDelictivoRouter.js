const express = require('express');
const bodyParser = require('body-parser');

const hechoDelictivoRouter = express.Router();

hechoDelictivoRouter.use(bodyParser.json());

hechoDelictivoRouter.route('/')
.all((req,res,next) => {
    console.log("Algo esta pasando");
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Este metodo retornara la lista de hechos delictivos');
})
.post((req, res, next) => {
    res.end('Se agregare el hecho_delictivo ' + req.body.name + ' que vive en : ' + req.body.address);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('el metodo PUT no es soportado en  /hecho_delictivo');
})
.delete((req, res, next) => {
    res.end('Eliminando todos los hechos delictivos');
});

hechoDelictivoRouter.route('/:hechoDelictivoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('hecho_delictivo: '+req.params.hechoDelictivoId);
});
module.exports = hechoDelictivoRouter;