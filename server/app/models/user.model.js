const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

/**
 * Mongoose schema for user model.
 */

let userSchema = new Schema({
  name: {
      type: String
  },
 email: {
      type: String,
      trim: true,
      lowercase: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

password:{
  type:String,
  required:"Password is missing"
}

},
{
  versionKey: false,

});


// Duplicate the id field as mongoose returns _id field instead of id.
userSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('User', userSchema);
