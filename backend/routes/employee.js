const express = require('express');
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// List/Search Employees
router.get('/', auth, async (req, res) => {
  const { search } = req.query;
  let query = {};
  if (search) {
    query = { name: { $regex: search, $options: 'i' } };
  }
  const employees = await Employee.find(query);
  res.json(employees);
});

// Add Employee
router.post('/', [auth, upload.single('profilePic')], async (req, res) => {
  const { name, type, email, phone } = req.body;
  const profilePic = req.file ? req.file.filename : '';
  const employee = new Employee({ name, type, email, phone, profilePic });
  await employee.save();
  res.json(employee);
});

// Get Employee Details
router.get('/:id', auth, async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
});

// Edit Employee
router.put('/:id', [auth, upload.single('profilePic')], async (req, res) => {
  const { name, type, email, phone } = req.body;
  const update = { name, type, email, phone };
  if (req.file) update.profilePic = req.file.filename;
  const employee = await Employee.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(employee);
});

// Delete Employee
router.delete('/:id', auth, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Employee deleted' });
});

module.exports = router;