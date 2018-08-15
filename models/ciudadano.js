var passportLocalMongoose = require('passport-local-mongoose');
var mongoose=require('mongoose');
var Esquema=mongoose.Schema;

var commentSchema = new Esquema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    timestamps: true
});

var esquemaCiudadano = new Esquema({
    nombre: {
        type: String,
        required: true
    },
    apellido:{
        type:String,
        required: true
    }
    , comentarios: [commentSchema]
});

esquemaCiudadano.plugin(passportLocalMongoose);
module.exports=mongoose.model('Ciudadano', esquemaCiudadano);