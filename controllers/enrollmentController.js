const Enrollment = require('../models/Enrollment');

exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) res.status(404).json({ message: 'Enrollment not found' });
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEnrollment = async (req, res) => {
  const enrollment = new Enrollment(req.body);
  try {
    const newEnrollment = await enrollment.save();
    res.status(201).json(newEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateEnrollment = async (req, res) => {
  try {
    const updatedEnrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEnrollment) res.status(404).json({ message: 'Enrollment not found' });
    res.json(updatedEnrollment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteEnrollment = async (req, res) => {
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!deletedEnrollment) res.status(404).json({ message: 'Enrollment not found' });
    res.json({ message: 'Enrollment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
