const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: { type: String }
});

module.exports = mongoose.model('Lesson', lessonSchema);
