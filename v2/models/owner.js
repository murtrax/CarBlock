const mongoose = require('mongoose');

const ownershipHistorySchema = new mongoose.Schema({
  carId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'cars',
  },
  yearOfPurchase: {
    type: Number,
    required: [true, 'Please enter the year of purchase'],
  },
  millageAtPurchaseTime: {
    type: Number,
    required: [true, 'Millage is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  state: {
    type: String,
    required: [true, 'State is required'],
  },
  name: {
    type: String,
    required: [true, 'Owner name is required'],
  },
  cnic: {
    type: String,
    required: [true, 'Owner CNIC is required'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
  },
});

module.exports = mongoose.model('owners', ownershipHistorySchema);
