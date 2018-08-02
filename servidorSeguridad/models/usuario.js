
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
    segundonombre: String,
    correo: {
        type: String,
        lowercase: true,
        validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    }
});

usuario.plugin(passportLocalMongoose);
module.exports=mongoose.model('Usuario', usuario);

var User = new Esquema({
  admin:   {
      type: Boolean,
      default: false
  }
});
