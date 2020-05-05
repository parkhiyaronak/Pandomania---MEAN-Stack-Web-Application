'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Function to validate email address.
 */

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

/**
 * Mongoose schema for donation object.
 */
let donationSchema = new Schema({
    name: {
        type: String,
        required: "Name is missing"
    },
    description: {
        type: String,
        required: "Description is missing"
    },
    Date: {
        type:Date
    },
    item:{
        type:String,
        required:"Item name is missing"
    },
    quantity:{
        type:Number
    },
    address:{
        type:String,
        required:"Address is missing"
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /^\d{10}$/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
      },
    donation_by: {
        type: String
    }
}
,
{
    versionKey: false,

});


// Duplicate id field as mongoose returns _id field instead of id.
donationSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
donationSchema.set('toJSON', {
    virtuals: true
});


module.exports = mongoose.model('donation', donationSchema);