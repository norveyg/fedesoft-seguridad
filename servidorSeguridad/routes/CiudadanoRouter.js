const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
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
    ciudadano.find({})
    .populate('comments.author')
    .then((ciudadanos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ciudadanos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,(req, res, next) => {
    ciudadano.create(req.body)
    .then((citizen)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({id:citizen._id});
    })
    .catch((err)=>{next(err)})
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
    ciudadano.findById(req.params.ciudadanoId)
    .populate('comments.author')
    .then((ciudadanos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(ciudadanos);
    }, (err) => next(err))
    .catch((err) => next(err));
});

CiudadanoRouter.route('/:ciudadanoId/comments')
.get((req,res,next) => {
    ciudadano.findById(req.params.ciudadanoId)
    .populate('comments.author')
    .then((ciudadanos) => {
        if (ciudadanos != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ciudadanos.comentarios);
        }
        else {
            err = new Error('Lo siento :(  ' + req.params.ciudadanoId + ' NO existe');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    ciudadano.findById(req.params.ciudadanoId)
    .then((ciudadanos) => {
        if (ciudadanos != null) {
            req.body.author = req.user._id;
            ciudadanos.comentarios.push(req.body);
            ciudadanos.save()
            .then((ciudadanos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ciudadanos);                
            }, (err) => next(err));
        }
        else {
            err = new Error('Lo siento :( ' + req.params.ciudadanoId + ' no existe');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
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

CiudadanoRouter.route('/:ciudadanoId/comments/:commentId')
.get((req,res,next) => {
    ciudadano.findById(req.params.ciudadanoId)
    .populate('comments.author')    
    .then((ciudadanos) => {
        if (ciudadanos != null && ciudadanos.comentarios.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ciudadanos.comentarios.id(req.params.commentId));
        }
        else if (ciudadanos == null) {
            err = new Error('Lo siento :( este lugar  ' + req.params.ciudadanoId + ' no existe');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Lo siento :( no hay comentarios con id:  ' + req.params.commentId + ' ');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})