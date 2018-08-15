
var passportLocalMongoose = require('passport-local-mongoose');
var mongoose=require('mongoose');
var Esquema=mongoose.Schema;

var usuario = new Esquema({
    username: {
        type: String,
        required: true
    },
    password:String,
    primernombre: String,
    apellido: String,
    correo: {
        type: String,
        lowercase: true,
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookId: String
});

usuario.plugin(passportLocalMongoose);
module.exports=mongoose.model('Usuario', usuario);

var User = new Esquema({
  admin:   {
      type: Boolean,
      default: false
  }
});
