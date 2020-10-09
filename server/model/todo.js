const mongoose = require('mongoose');
const { t } = require('localizify');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, t('{n} is required', { n: t('title') })],
      unique: [true, t('{n} already registered', { n: t('title') })],
      maxlength: [30, t('{n} {x} {m} characters', { n: t('name'), x: 'max', m: 30 })],
    },
    status: {
      type: String,
      required: [true, t('{n} is required', { n: t('status') })],
      default: 'undone',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auth',
      required: [true, t('{n} is required', { n: t('user') })],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
