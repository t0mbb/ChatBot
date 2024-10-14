var mongoose = require('mongoose');
var feedback = mongoose.Schema(
   {
      name: {
         type: String,
      },
      rating: {
         type: String,
      },
      addtional: {
         type: String
      }
   }
);
var UserModel = mongoose.model('feedback', feedback);
module.exports = UserModel;

