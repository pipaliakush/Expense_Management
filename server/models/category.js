const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  icon: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Categories', CategorySchema);
