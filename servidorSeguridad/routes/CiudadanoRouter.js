const express = require('express');
const bodyParser = require('body-parser');
var ciudadano = require('../models/ciudadano');
var authenticate = require('../authenticate');

const CiudadanoRouter = express.Router();

CiudadanoRouter.use(bodyParser.json());

CiudadanoRouter.route('/')
    //CiudadanoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    }) /*
.get((req,res,next) => {
    res.end('Este metodo retornara la lista de ciudadanos:'+req.params.CiudadanoId);
    res.end('Este metodo retornara la lista de ciudadanos');
}) */

    .get((req, res, next) => {
        ciudadano.find({})
            .populate('comments.author')
            .then((ciudadano) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ciudadano);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    /*
    .post((req, res, next) => {
        res.end('Se agregara el ciudadano ' + req.body.name + ' que vive en : ' + req.body.address);
    })*/
    .post(authenticate.verifyUser, (req, res, next) => {
        ciudadano.create(req.body)
            .then((ciudadano) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ id: ciudadano._id });
            })
            .catch((err) => { next(err) })
        //res.end('Se agregara el ciudadano ' + req.body.username + ' que vive en : ' + req.body.correo);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('el metodo PUT no es soportado en  /ciudadanos');
    })
    .delete((req, res, next) => {
        res.end('Eliminando todos los ciudadanos');
    });
/*CiudadanoRouter.route('/:ciudadanoId')
//CiudadanoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    //res.end('Este metodo retornara la lista de ciudadanos'+req.params.ciudadanoId);
    res.end('Este metodo retornara la lista de ciudadanos'+req.params.ciudadanoId);
})*/

CiudadanoRouter.route('/:ciudadanoId')
    .get((req, res, next) => {
        ciudadano.findById(req.params.ciudadanoId)
            //.populate('comments.author')
            .then((ciudadanoCons) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ciudadanoCons);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

CiudadanoRouter.route('/grupo/:ciudadanoId')
    //CiudadanoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        //res.end('Este metodo retornara la lista de ciudadanos'+req.params.ciudadanoId);
        res.end('aaaaatodo retornara la lista de ciudadanos' + req.params.ciudadanoId);
    })
CiudadanoRouter.route('/registro')
    //CiudadanoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
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

CiudadanoRouter.route('/:ciudadanoId/comentarios')
.get((req,res,next) => {
    ciudadano.findById(req.params.ciudadanoId)
    .populate('comentarios.author')
    .then((ciudadanoCons) => {
        if (ciudadanoCons != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ciudadanoCons.comentarios);
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
    .then((ciudadanoCons) => {
        if (ciudadanoCons != null) {
            req.body.author = req.user._id;
            ciudadanoCons.comentarios.push(req.body);
            ciudadanoCons.save()
            .then((ciudadanoCons) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ciudadanoCons);                
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

CiudadanoRouter.route('/:ciudadanoId/comentarios/:commentId')
.get((req,res,next) => {
    ciudadano.findById(req.params.ciudadanoId)
    .populate('commentarios.author')    
    .then((ciudadanoCons) => {
        if (ciudadanoCons != null && ciudadanoCons.commentarios._id != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(ciudadanoCons.commentarios.id);
        }
        else if (ciudadanoCons == null) {
            err = new Error('Lo siento :( este ciudadano  ' + req.params.ciudadanoId + ' no existe');
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

module.exports = CiudadanoRouter;