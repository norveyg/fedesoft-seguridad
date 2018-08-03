var mongoose=require('mongoose');
var Esquema=mongoose.Schema;
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
    }
});

module.exports=mongoose.model('Ciudadano',ciudadano);