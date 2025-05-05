const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  type: String,
  profilePic: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('Employee', EmployeeSchema);