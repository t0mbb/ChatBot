var mongoose = require('mongoose');
var order = mongoose.Schema(
   {
      quantity: {
         type: Number,
         require : true
      },
      size: {
         type: String,
         require : true
      },
      phone: {
         type: String,
         require : true
      },
      name : {
        type : String,
      },
      price : {
        type : Number,
      },
      address : {
        type : String,
      }
   }
);
var UserModel = mongoose.model('carts', order);
module.exports = UserModel;

