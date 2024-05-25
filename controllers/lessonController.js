const Lesson = require('../models/Lesson');

exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLesson = async (req, res) => {
  const lesson = new Lesson(req.body);
  try {
    const newLesson = await lesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLesson) res.status(404).json({ message: 'Lesson not found' });
    res.json(updatedLesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!deletedLesson) res.status(404).json({ message: 'Lesson not found' });
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
