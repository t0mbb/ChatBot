var mongoose = require('mongoose');
var order = mongoose.Schema(
   {
      name: {
         type: String,
         require : true
      },
      email: {
         type: String,
         require : true
      },
      address: {
         type: String,
         require : true
      },
      phone : {
         type : String,
      },
      quantity:{
         type: String,
      },
      size:{
         type : String
      }
      
      
   }
);
var UserModel = mongoose.model('orderHN', order);
module.exports = UserModel;

