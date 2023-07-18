const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 256
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  cat: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    required: false,
  },
});


const Blogs = mongoose.model('Blogs', blogSchema);
exports.Blogs = Blogs; 
