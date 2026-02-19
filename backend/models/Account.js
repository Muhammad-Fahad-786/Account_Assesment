/**
 * Account Model
 * 
 * Defines the schema for bank accounts in the MongoDB database.
 * Each account has a unique account number, holder name, balance, and KYC verification status.
 */

const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  holderName: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  isKYCVerified: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);
