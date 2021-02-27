const mongoose = require('mongoose');

const SourceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  type: {
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

module.exports = mongoose.model('Sources', SourceSchema);
