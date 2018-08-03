# Fedesoft Seguridad
- Paso 1: crear el servidor
- Paso 2: documentar las declaraciones de alcance
- Paso 3: crear documento de requerimientos y arquitectura
- Paso 4: (lo más fácil) implementar
- Paso 5: mostrar


{
	"username":"miUsuario9",
	"password":"miPassword9",
	"primerNombre":"aaabbb9",
	"segundoNombre":"dddeee9",
	"correo":"aaabbb9@gmail.com"
}

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
