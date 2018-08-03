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
        ref: 'Usuario' /// Aqui debemos modificar por nuestro modelo de usuarios 
    }
}, {
    timestamps: true
});

var ciudadano=new Esquema({
    username:{
        type:String,
        required:true
    },
    password:String,
    primernombre:String,
    segundonombre:String,
    direccion:String,
    telefono:String,
    correo:{
        type:String,
        required:true,
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },comentarios:[commentSchema]
});

module.exports=mongoose.model('Ciudadano',ciudadano);