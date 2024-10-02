var mongoose = require('mongoose');
var customer = mongoose.Schema(
   {
      name: {
         type: String,
      },
      dob: {
         type: String,
      },
      phone: {
         type: String
      }
   }
);
var UserModel = mongoose.model('customer', customer);
module.exports = UserModel;

